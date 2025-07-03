# Product Showcase Backend API

## Setup Instructions

1. Clone and install dependencies:
```bash
npm install
```

2. Set up your `.env` file with Supabase credentials
3. Run database seeding:
```bash
npm run seed:admin     # Creates admin user
npm run seed:sample    # Creates sample categories and products
```

4. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current user info (protected)

### Categories
- `GET /api/categories` - Get all categories (public)
- `POST /api/categories` - Create category (protected)
- `PUT /api/categories/:id` - Update category (protected)
- `DELETE /api/categories/:id` - Delete category (protected)

### Products
- `GET /api/products` - Get all products (public)
  - Query params: `categoryId`, `search`, `page`, `limit`, `isActive`
- `GET /api/products/:id` - Get single product (public)
- `POST /api/products` - Create product (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)
- `PATCH /api/products/bulk-update` - Bulk update products (protected)

## Sample API Usage

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@yoursite.com","password":"your_secure_password"}'
```

### Create Category
```bash
curl -X POST http://localhost:5000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"name":"Home Appliances","description":"Kitchen and home appliances"}'
```

### Create Product
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name":"Microwave Oven",
    "description":"Digital microwave with grill function",
    "price":15000,
    "originalPrice":18000,
    "imageUrl":"https://example.com/microwave.jpg",
    "externalUrl":"https://daraz.pk/microwave",
    "categoryId":"CATEGORY_UUID_HERE"
  }'
```

### Get Products with Filters
```bash
# Get products by category
curl "http://localhost:5000/api/products?categoryId=CATEGORY_UUID"

# Search products
curl "http://localhost:5000/api/products?search=samsung"

# Paginated results
curl "http://localhost:5000/api/products?page=1&limit=10"
```