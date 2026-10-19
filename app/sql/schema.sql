-- =========================================
-- FARMERS
-- =========================================

CREATE TABLE IF NOT EXISTS farmers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    village VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- CROPS
-- =========================================

CREATE TABLE IF NOT EXISTS crops (
    id SERIAL PRIMARY KEY,

    farmer_id INTEGER NOT NULL
        REFERENCES farmers(id)
        ON DELETE CASCADE,

    crop_name VARCHAR(100) NOT NULL,

    season VARCHAR(50),

    area DECIMAL(10,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- EXPENSES
-- =========================================

CREATE TABLE IF NOT EXISTS expenses (
    id SERIAL PRIMARY KEY,

    farmer_id INTEGER NOT NULL
        REFERENCES farmers(id)
        ON DELETE CASCADE,

    crop_id INTEGER NOT NULL
        REFERENCES crops(id)
        ON DELETE CASCADE,

    category VARCHAR(50) NOT NULL,

    description VARCHAR(255),

    amount DECIMAL(12,2) NOT NULL
        CHECK (amount > 0),

    expense_date DATE DEFAULT CURRENT_DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- CROP INCOME
-- =========================================

CREATE TABLE IF NOT EXISTS crop_income (
    id SERIAL PRIMARY KEY,

    farmer_id INTEGER NOT NULL
        REFERENCES farmers(id)
        ON DELETE CASCADE,

    crop_id INTEGER NOT NULL
        REFERENCES crops(id)
        ON DELETE CASCADE,

    amount DECIMAL(12,2) NOT NULL
        CHECK (amount > 0),

    income_date DATE DEFAULT CURRENT_DATE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- =========================================
-- DEMO FARMER
-- =========================================

INSERT INTO farmers (name, phone, village)
VALUES ('Demo Farmer', '9999999999', 'Pune')
ON CONFLICT DO NOTHING;