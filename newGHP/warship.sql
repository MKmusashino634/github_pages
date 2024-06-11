/*
 * for warship
 *
 *
 */

PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS Area;
DROP TABLE IF EXISTS Purchase;
DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS Customer;

CREATE TABLE warship (
  warship_id	TEXT,
  area_name		TEXT,
  PRIMARY KEY (customer_id)
);

CREATE TABLE Item (
  item_id TEXT,
  price   INTEGER,
  PRIMARY KEY (item_id)
);

CREATE TABLE Purchase (
  customer_id TEXT,
  item_id     TEXT,
  quantity    INTEGER,
  FOREIGN KEY (customer_id) REFERENCES Customer (customer_id),
  FOREIGN KEY (item_id) REFERENCES Item (item_id)
);

CREATE TABLE Area (
  area_name TEXT,
  PRIMARY KEY (area_name)
);

INSERT INTO Customer (customer_id, area_name) VALUES ('C001', 'Aichi');
INSERT INTO Customer (customer_id, area_name) VALUES ('C002', 'Gifu');
INSERT INTO Customer (customer_id, area_name) VALUES ('C003', 'Aichi');
INSERT INTO Customer (customer_id, area_name) VALUES ('C004', 'Mie');

INSERT INTO Item (item_id, price) VALUES ('I001', 1000);
INSERT INTO Item (item_id, price) VALUES ('I002', 300);
INSERT INTO Item (item_id, price) VALUES ('I003', 500);
INSERT INTO Item (item_id, price) VALUES ('I004', 2000);

INSERT INTO Purchase (customer_id, item_id, quantity) VALUES ('C001', 'I001', 1);
INSERT INTO Purchase (customer_id, item_id, quantity) VALUES ('C002', 'I002', 4);
INSERT INTO Purchase (customer_id, item_id, quantity) VALUES ('C003', 'I004', 2);
INSERT INTO Purchase (customer_id, item_id, quantity) VALUES ('C003', 'I003', 5);
INSERT INTO Purchase (customer_id, item_id, quantity) VALUES ('C002', 'I001', 3);
INSERT INTO Purchase (customer_id, item_id, quantity) VALUES ('C004', 'I002', 1);

INSERT INTO Area (area_name) VALUES ('Gifu');
INSERT INTO Area (area_name) VALUES ('Mie');
