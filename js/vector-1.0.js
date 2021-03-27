class Vector {
  static enableSwizzle = false;

  set x(a) {
    this.componentIsSet[0] = true;
    this._x = a;
  }
  set y(a) {
    this.componentIsSet[1] = true;
    this._y = a;
  }
  set z(a) {
    this.componentIsSet[2] = true;
    this._z = a;
  }
  set w(a) {
    this.componentIsSet[3] = true;
    this._w = a;
  }
  
  get x() {return this._x;}
  get y() {return this._y;}
  get z() {return this._z;}
  get w() {return this._w;}

  constructor(x, y, z, w) {
    var components = ["x", "y", "z", "w"];
    
    this.componentIsSet = [false, false, false, false];
    this._x = 0;
    this._y = 0;
    this._z = 0;
    this._w = 0;
    
    if (arguments.length > 0 && y === undefined && z === undefined && z === undefined) {
      if (x !== null && typeof x !== "undefined") {
        if (Array.isArray(x)) {
          for (var i = 0; i < x.length; i++) {
            this[components[i]] = x[i];
          }
        }
        else if (typeof x === "object") {
          for (var i = 0; i < components.length; i++) {
            var component = components[i];
            if (x[component] !== undefined) {
              this[component] = x[component];
            }
          }
        }
        else if (typeof x === "number") {
          this.x = x;
        }
      }
      else {
        throw Error("Argument is null or undefined");
      }
    }
    else {
      if (typeof x === "number") this.x = x;
      if (y !== undefined && typeof y === "number") this.y = y;
      if (z !== undefined && typeof z === "number") this.z = z;
      if (w !== undefined && typeof w === "number") this.w = w;
    }
    
    if (Vector.enableSwizzle) {
      this.createProperty = function(compArray) {
        var name = "";
        for (var i = 0; i < compArray.length; i++) {
          name += components[compArray[i]];
        }
        Object.defineProperty(this, name, {
          get: (function(compArray) {
            return function() {
              return new Vector(
                compArray[0] !== undefined ? this[components[compArray[0]]] : 0,
                compArray[1] !== undefined ? this[components[compArray[1]]] : 0,
                compArray[2] !== undefined ? this[components[compArray[2]]] : 0,
                compArray[3] !== undefined ? this[components[compArray[3]]] : 0
              );
            };
          })(compArray)
        });
      };

      for (var i = 0; i < components.length; i++) {
        for (var j = 0; j < components.length; j++) {
          this.createProperty([i, j]);
          for (var k = 0; k < components.length; k++) {
            this.createProperty([i, j, k]);
            for (var l = 0; l < components.length; l++) {
              this.createProperty([i, j, k, l]);
            }
          }
        }
      }
    }
  }
  
  copy() {
    return new Vector(this.x, this.y, this.z, this.w);
  }

  set(x, y, z, w) {
    if (x instanceof Vector) {
      if (x.componentIsSet[0]) this.x = x.x;
      if (x.componentIsSet[1]) this.y = x.y;
      if (x.componentIsSet[2]) this.z = x.z;
      if (x.componentIsSet[3]) this.w = x.w;
    }
    else {
      if (typeof x !== "undefined") this.x = x;
      if (typeof y !== "undefined") this.y = y;
      if (typeof z !== "undefined") this.z = z;
      if (typeof w !== "undefined") this.w = w;
    }
  }
  
  static add(a, b) {
    return new Vector({
      x: a.x + b.x,
      y: a.y + b.y,
      z: a.z + b.z,
      w: a.w + b.w
    });
  }
  
  add(b) {
    this.set(Vector.add(this, b));
  }
  
  static subtract(a, b) {
    return new Vector({
      x: a.x - b.x,
      y: a.y - b.y,
      z: a.z - b.z,
      w: a.w - b.w
    });
  }
  
  subtract(b) {
    this.set(Vector.subtract(this, b));
  }
  
  static minus(a, b) {
    return new Vector({
      x: a.x - b.x,
      y: a.y - b.y,
      z: a.z - b.z,
      w: a.w - b.w
    });
  }
  
  minus(b) {
    this.set(Vector.minus(this, b));
  }
  
  static multiply(a, b) {
    if (typeof a === "number" && b instanceof Vector) {
      return Vector.multiply(b, a);
    }
    else {
      return new Vector({
        x: a.x * b,
        y: a.y * b,
        z: a.z * b,
        w: a.w * b
      });
    }
  }
  
  multiply(b) {
    this.set(Vector.multiply(this, b));
  }
  
  static compMultiply(a, b) {
    return new Vector({
      x: a.x * b.x,
      y: a.y * b.y,
      z: a.z * b.z,
      w: a.w * b.w
    });
  }
  
  compMultiply(b) {
    this.set(Vector.compMultiply(this, b));
  }
  
  static divide(a, b) {
    if (typeof a === "number" && b instanceof Vector) {
      return Vector.divide(b, a);
    }
    else {
      return new Vector({
        x: a.x / b,
        y: a.y / b,
        z: a.z / b,
        w: a.w / b
      });
    }
  }
  
  divide(b) {
    this.set(Vector.divide(this, b));
  }
  
  static compDivide(a, b) {
    return new Vector({
      x: a.x / b.x,
      y: a.y / b.y,
      z: a.z / b.z,
      w: a.w / b.w
    });
  }
  
  compDivide(b) {
    this.set(Vector.compDivide(this, b));
  }
  
  static dot(a, b) {
    return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
  }
  
  static crossProduct(a, b) {
    return new Vector(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    );
  }
  
  static rotate2D(v, a) {
    return new Vector(
      v.x * Math.cos(a) - v.y * Math.sin(a),
      v.x * Math.sin(a) + v.y * Math.cos(a)
    );
  }
  
  static reflect(vector, normal) {
    return Vector.subtract(vector, Vector.multiply(normal, 2 * Vector.dot(vector, normal)));
  }
  
  static angle(a) {
    return Math.atan2(a.y, a.x);
  }
  
  static length(a) {
    return Math.sqrt(a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w);  
  }
  
  static lengthSqr(a) {
    return a.x * a.x + a.y * a.y + a.z * a.z + a.w * a.w;
  }
  
  static setLength(a, len) {
    return Vector.multiply(Vector.normalize(a), len);
  }

  static normalize(a) {
    return Vector.divide(a, Vector.length(a));
  }

  normalized() {
    return Vector.normalize(this);
  }
  
  static negate(a) {
    return Vector.multiply(a, -1);
  }
  
  static getDistance(a, b) {
    return Vector.length(Vector.subtract(a, b));
  }
  
  static zero() {
    return new Vector();
  }
  static one() {
    return new Vector(1, 1, 1, 1);
  }
  static up() {
    return new Vector(0, 1, 0, 0);
  }
  static down() {
    return new Vector(0, -1, 0, 0);
  }
  static random2D() {
    return new Vector(Math.random(), Math.random());
  }
  static random3D() {
    return new Vector(Math.random(), Math.random(), Math.random());
  }
}