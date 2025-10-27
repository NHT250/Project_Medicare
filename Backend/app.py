# Medicare Backend API - Flask Application
from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
import bcrypt
import jwt
from datetime import datetime, timedelta
from config import Config
from bson import ObjectId
import json

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS
CORS(app, origins=Config.CORS_ORIGINS)

# Connect to MongoDB
client = MongoClient(Config.MONGODB_URI)
db = client[Config.DATABASE_NAME]

# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc is None:
        return None
    if isinstance(doc, dict):
        doc['_id'] = str(doc['_id'])
    return doc

# ============ ROUTES ============

@app.route('/')
def index():
    return jsonify({
        'message': 'Welcome to Medicare API',
        'version': '1.0.0',
        'endpoints': {
            'auth': '/api/auth/register, /api/auth/login',
            'products': '/api/products',
            'categories': '/api/categories',
            'cart': '/api/cart',
            'orders': '/api/orders'
        }
    })

# ============ AUTHENTICATION ============

@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.json
        
        # Check if user exists
        if db.users.find_one({'email': data['email']}):
            return jsonify({'error': 'User already exists'}), 400
        
        # Hash password
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())
        
        # Create user
        user = {
            'email': data['email'],
            'password': hashed_password.decode('utf-8'),
            'name': data.get('name', ''),
            'phone': data.get('phone', ''),
            'address': data.get('address', {}),
            'createdAt': datetime.now(),
            'updatedAt': datetime.now()
        }
        
        result = db.users.insert_one(user)
        user['_id'] = str(result.inserted_id)
        user.pop('password')  # Remove password from response
        
        return jsonify({'message': 'User created successfully', 'user': serialize_doc(user)}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.json
        
        # Find user
        user = db.users.find_one({'email': data['email']})
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Check password
        if not bcrypt.checkpw(data['password'].encode('utf-8'), user['password'].encode('utf-8')):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': str(user['_id']),
            'email': user['email'],
            'exp': datetime.utcnow() + timedelta(seconds=Config.JWT_EXPIRATION_DELTA)
        }, Config.JWT_SECRET_KEY, algorithm=Config.JWT_ALGORITHM)
        
        user.pop('password')
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': serialize_doc(user)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============ PRODUCTS ============

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        # Get query parameters
        category = request.args.get('category')
        limit = int(request.args.get('limit', 20))
        
        query = {}
        if category:
            query['category'] = category
        
        products = list(db.products.find(query).limit(limit))
        
        return jsonify({
            'products': [serialize_doc(product) for product in products],
            'count': len(products)
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/products/<product_id>', methods=['GET'])
def get_product(product_id):
    try:
        product = db.products.find_one({'_id': ObjectId(product_id)})
        return jsonify(serialize_doc(product))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============ CATEGORIES ============

@app.route('/api/categories', methods=['GET'])
def get_categories():
    try:
        categories = list(db.categories.find())
        return jsonify({
            'categories': [serialize_doc(cat) for cat in categories]
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============ CART ============

@app.route('/api/cart', methods=['GET'])
def get_cart():
    try:
        user_id = request.headers.get('user_id')  # In production, get from JWT token
        
        cart = db.carts.find_one({'userId': user_id})
        if not cart:
            return jsonify({
                'userId': user_id,
                'items': [],
                'total': 0
            })
        
        return jsonify(serialize_doc(cart))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    try:
        data = request.json
        user_id = request.headers.get('user_id')
        
        # Get product
        product = db.products.find_one({'_id': ObjectId(data['productId'])})
        if not product:
            return jsonify({'error': 'Product not found'}), 404
        
        # Get or create cart
        cart = db.carts.find_one({'userId': user_id})
        
        if not cart:
            cart = {
                'userId': user_id,
                'items': [],
                'total': 0,
                'updatedAt': datetime.now()
            }
            db.carts.insert_one(cart)
        
        # Add or update item
        item_existing = False
        for item in cart['items']:
            if item['productId'] == data['productId']:
                item['quantity'] += data.get('quantity', 1)
                item_existing = True
                break
        
        if not item_existing:
            cart['items'].append({
                'productId': str(product['_id']),
                'quantity': data.get('quantity', 1),
                'price': product['price'],
                'subtotal': product['price'] * data.get('quantity', 1)
            })
        
        # Calculate total
        cart['total'] = sum(item['subtotal'] for item in cart['items'])
        cart['updatedAt'] = datetime.now()
        
        # Update cart
        db.carts.update_one({'_id': cart['_id']}, {'$set': cart})
        
        return jsonify({'message': 'Item added to cart', 'cart': serialize_doc(cart)})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============ ORDERS ============

@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        user_id = request.headers.get('user_id')
        
        orders = list(db.orders.find({'userId': user_id}).sort('createdAt', -1))
        
        return jsonify({
            'orders': [serialize_doc(order) for order in orders]
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        data = request.json
        user_id = request.headers.get('user_id')
        
        # Generate order ID
        order_id = f"ORD{datetime.now().strftime('%Y%m%d%H%M%S')}"
        
        order = {
            'orderId': order_id,
            'userId': user_id,
            'items': data['items'],
            'shipping': data['shipping'],
            'payment': data['payment'],
            'subtotal': data['subtotal'],
            'shippingFee': data['shippingFee'],
            'tax': data['tax'],
            'total': data['total'],
            'status': 'pending',
            'createdAt': datetime.now(),
            'updatedAt': datetime.now()
        }
        
        result = db.orders.insert_one(order)
        order['_id'] = str(result.inserted_id)
        
        return jsonify({'message': 'Order created successfully', 'order': serialize_doc(order)}), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============ RUN SERVER ============

if __name__ == '__main__':
    print('🚀 Starting Medicare API Server...')
    print(f'📍 MongoDB: {Config.MONGODB_URI}{Config.DATABASE_NAME}')
    app.run(debug=Config.DEBUG, host=Config.HOST, port=Config.PORT)

