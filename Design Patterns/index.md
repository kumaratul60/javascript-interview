
# JavaScript Design Patterns: A Clear Guide
## [detail read refer this](https://github.com/kumaratul60/design-patterns)

This guide explains common design patterns using pure JavaScript, with real-world problems, examples, and code snippets to make them easy to understand.

---

## 1. The Singleton Pattern

### Definition

The Singleton pattern is a **creational pattern** that ensures a class has **only one instance**, while providing a **global access point** to this instance.

Think of it like the principal's office in a school. There is only one principal's office, and everyone knows where to find it. You don't build a new principal's office every time someone needs to speak to them.

### Real-World Problem

Imagine you are building a web application. You have a central `AppSettings` object that stores important configuration data like the API URL, the current theme (e.g., 'dark' or 'light'), and the user's language preference.

Many different parts of your application (the header, the sidebar, a data-fetching service) need to read or update these settings.

**The Problem:** If each part of the application creates its own `AppSettings` object, you'll have chaos!
- The header might set the theme to 'dark'.
- The sidebar might create a *new*, separate settings object and set the theme to 'light'.
- The data-fetching service might create yet another object and not know which theme is currently active.

You would have multiple, conflicting sources of truth, leading to bugs and unpredictable behavior.

### The Solution: Using a Singleton

The Singleton pattern solves this by guaranteeing that there is **only ONE** `AppSettings` object for the entire application. Any part of the code that asks for the settings will get a reference to the *exact same instance*.

### How to Use: Code Snippet

Here is a modern JavaScript (ES6 Class) implementation of the Singleton pattern.

```javascript
class AppSettings {
    // 1. A private static property to hold the single instance.
    static instance;

    // 2. The constructor is where the magic happens.
    constructor() {
        // If an instance already exists, return that instance instead of creating a new one.
        if (AppSettings.instance) {
            return AppSettings.instance;
        }

        // If no instance exists, create one and store it.
        this.settings = {
            theme: 'light',
            apiUrl: 'https://api.myapp.com',
            language: 'en'
        };
        AppSettings.instance = this;
    }

    // Public method to get a setting
    get(key) {
        return this.settings[key];
    }

    // Public method to set a setting
    set(key, value) {
        this.settings[key] = value;
    }
}
```

// To ensure the object isn't accidentally created with `new`, we freeze it.
const settingsInstance = new AppSettings();
Object.freeze(settingsInstance);

// --- USAGE ---

// Get the settings instance from anywhere in your app.
// Note: We don't use `new` again. We just use the instance we created.
const settings1 = settingsInstance;
const settings2 = settingsInstance; // This will point to the exact same object.

// Verify that they are the same instance
console.log(settings1 === settings2); // true

// Now, let's change a setting from one part of the app
console.log('Initial theme:', settings1.get('theme')); // 'light'
settings1.set('theme', 'dark');
console.log('Theme after change:', settings1.get('theme')); // 'dark'

// Another part of the app checks the theme and sees the updated value
console.log('Theme seen by another module:', settings2.get('theme')); // 'dark'
```

### When to Use the Singleton Pattern

Use it when you must have exactly one instance of a class, and it must be accessible by clients from a well-known access point.

- **Configuration Management:** A global configuration object for an application.
- **Logging Service:** A single logger instance that all parts of the application use to write logs to a file or console.
- **Database Connection Pool:** Managing a single pool of connections to a database to avoid the overhead of creating new connections.
- **Hardware Interface Access:** If you are controlling a single piece of hardware (like a printer or a specific port), a singleton can prevent conflicts.

### Pros & Cons

- **Pros:**
    - Guarantees a single instance, controlling access to a shared resource.
    - Provides a convenient global point of access.
    - The singleton is only created when it's first needed (lazy initialization).

- **Cons:**
    - Can be considered an anti-pattern by some because it introduces a **global state** into an application, which can make testing difficult.
    - Can hide dependencies. Instead of passing a dependency (like a config object) into a module, the module might just grab the global singleton, making the code less explicit.
    - Violates the Single Responsibility Principle (the class is responsible for its own logic *and* for managing its own instantiation).

```


Excellent. Let's add the **Factory Pattern**. This is another fundamental **creational pattern**.

Append the following content to your `.md` file.

```markdown
---

## 2. The Factory Pattern

### Definition

The Factory Pattern is a **creational pattern** that provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created. More simply, it's a way to **delegate the responsibility of object instantiation to a separate "factory" function or class**.

Think of it like a car factory. The client (you) doesn't need to know how to assemble an engine, weld the frame, or install the seats. You just go to the factory and say, "I want a blue sedan," and the factory handles all the complex steps to give you the finished car.

### Real-World Problem

Imagine you're building a content management system (CMS). Your CMS needs to support different types of employees, such as `Developer` and `Tester`. Each employee type has different responsibilities and a different hourly rate.

In your main application logic, you might have code that creates these employees:

```javascript
// The "bad" way - client code is tightly coupled to concrete classes
let employee;
if (type === 'developer') {
    employee = new Developer('John Doe', 100);
} else if (type === 'tester') {
    employee = new Tester('Jane Smith', 80);
} // ...what if we add a 'designer' or 'manager'? More 'else if' statements!

employee.doWork();
```

**The Problem:** This code has a major issue. The main application logic is now **tightly coupled** to the `Developer` and `Tester` classes. If you want to add a new employee type, like `Designer`, you have to go back and modify this `if/else` block. This violates the **Open/Closed Principle** (code should be open for extension, but closed for modification).

### The Solution: Using a Factory

The Factory Pattern abstracts this creation logic into a dedicated `EmployeeFactory`. The main application no longer needs to know *how* to create each employee type. It just asks the factory for an employee of a specific type.

### How to Use: Code Snippet

Here’s how you can implement the Factory Pattern in JavaScript.

```javascript
// --- The "Products" (different types of employees) ---

class Developer {
    constructor(name, hourlyRate = 100) {
        this.name = name;
        this.hourlyRate = hourlyRate;
        this.type = 'Developer';
    }

    sayHello() {
        console.log(`Hi, I am ${this.name}, a ${this.type}. My rate is $${this.hourlyRate}/hour.`);
    }
}

class Tester {
    constructor(name, hourlyRate = 80) {
        this.name = name;
        this.hourlyRate = hourlyRate;
        this.type = 'Tester';
    }

    sayHello() {
        console.log(`Hi, I am ${this.name}, a ${this.type}. My rate is $${this.hourlyRate}/hour.`);
    }
}

// --- The "Factory" ---

class EmployeeFactory {
    create(name, type) {
        switch (type.toLowerCase()) {
            case 'developer':
                return new Developer(name);
            case 'tester':
                return new Tester(name);
            default:
                throw new Error(`Invalid employee type: ${type}`);
        }
    }
}

// --- USAGE ---

const factory = new EmployeeFactory();
const employees = [];

// The client code is now clean and decoupled!
employees.push(factory.create('John Doe', 'developer'));
employees.push(factory.create('Jane Smith', 'tester'));

// If we wanted to add a 'Designer', we would only modify the factory,
// not this client code.
// employees.push(factory.create('Peter Pan', 'designer')); // Would throw error until we update the factory

employees.forEach(emp => emp.sayHello());

// Output:
// Hi, I am John Doe, a Developer. My rate is $100/hour.
// Hi, I am Jane Smith, a Tester. My rate is $80/hour.
```

### When to Use the Factory Pattern

Use it when the object creation logic is complex or when you want to decouple your client code from the specific classes you need to instantiate.

- **Complex Object Creation:** When creating an object involves more than just a simple `new` call (e.g., setting up dependencies, fetching data, configuring properties).
- **Decoupling:** When you want the client code to work with a general interface/class without knowing the specific implementation details (e.g., creating a `DatabaseConnection` object that could be `MySQLConnection`, `PostgreSQLConnection`, or `MongoConnection` based on a configuration setting).
- **Frameworks and Libraries:** When you are building a library and want to allow users to add their own custom types without changing the library's core code. For example, a charting library might use a factory to create different chart types (`BarChart`, `PieChart`, etc.).

### Pros & Cons

- **Pros:**
    - **Decouples your code:** The client code isn't tied to concrete classes.
    - **Centralizes creation logic:** Makes the code easier to maintain, as all creation logic is in one place.
    - **Follows SOLID principles:** Adheres to the Single Responsibility and Open/Closed principles. You can introduce new product types without breaking existing client code.

- **Cons:**
    - **Increased Complexity:** You introduce a new class (the factory), which adds more complexity to the overall code structure, especially for simple cases.
    - **Can become a large `switch` statement:** If you have many product types, the factory method can become a large and unwieldy `switch` statement (though this can be mitigated with more advanced patterns).
```

```

## 3. The Observer Pattern

### Definition

The Observer Pattern is a **behavioral pattern** that defines a **one-to-many dependency** between objects. When one object (the "Subject" or "Observable") changes its state, all of its dependents (the "Observers") are notified and updated automatically.

Think of subscribing to a YouTube channel.
- The **YouTuber** is the **Subject**.
- **You** (and all other subscribers) are the **Observers**.
- When the YouTuber uploads a new video (a change in state), YouTube's notification system (the mechanism) automatically sends a notification to all subscribers. The YouTuber doesn't need to know who you are individually; they just "publish" the update, and the system handles the rest.

### Real-World Problem

Imagine you're building an e-commerce website with a shopping cart. Several parts of the User Interface (UI) need to know how many items are in the cart:
1.  The small cart icon in the main navigation header.
2.  A "mini-cart" dropdown that shows a summary.
3.  The main checkout page.

**The Problem:** When a user adds an item to the cart, how do you ensure all these different components update correctly?

A naive approach would be to have the "add to cart" button logic contain direct calls to update each component:
`header.updateCount()`, `miniCart.updateView()`, `checkoutPage.refreshTotal()`.

This creates **tight coupling**. The "add to cart" logic is now burdened with knowing about every other component that cares about the cart. If you add a new "recommended items" widget that also needs the cart count, you have to go back and modify the "add to cart" logic again. This is brittle and hard to maintain.

### The Solution: Using the Observer Pattern

We can treat the `ShoppingCart` as the **Subject** and the UI components (`HeaderIcon`, `MiniCart`) as **Observers**.

-   The `ShoppingCart` maintains a list of all observers who have "subscribed" to it.
-   When an item is added or removed, the `ShoppingCart` simply iterates through its list of observers and notifies them of the change, passing along the new data (e.g., the new item count).
-   The UI components are responsible for how they react to that notification. The `ShoppingCart` doesn't care *how* they update, only that they are notified.

### How to Use: Code Snippet

Here is a classic implementation of the Observer pattern in pure JavaScript.

```javascript
// The Subject (the thing being watched)
class ShoppingCart {
    constructor() {
        this.observers = [];
        this.items = [];
    }

    // Add an observer (component) to the list
    subscribe(observer) {
        this.observers.push(observer);
    }

    // Remove an observer from the list
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }

    // Notify all observers about a change
    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }

    // A method that changes the state and triggers notification
    addItem(item) {
        this.items.push(item);
        console.log(`--- Added "${item.name}" to cart ---`);
        // Notify everyone that the cart has changed!
        this.notify({ items: this.items, count: this.items.length });
    }
}

// An Observer (a thing that watches)
class HeaderCartIcon {
    constructor() {
        this.count = 0;
    }

    // This method is called by the Subject when it's updated
    update(data) {
        this.count = data.count;
        console.log(`Header Icon: Cart count is now ${this.count}.`);
        // In a real app, you would update the DOM here.
    }
}

// Another Observer
class NotificationService {
    update(data) {
        const latestItem = data.items[data.items.length - 1];
        console.log(`Notification: "${latestItem.name}" was added to your cart.`);
    }
}


// --- USAGE ---

// 1. Create the Subject instance
const cart = new ShoppingCart();

// 2. Create the Observer instances
const headerIcon = new HeaderCartIcon();
const notificationService = new NotificationService();

// 3. Subscribe the observers to the subject
cart.subscribe(headerIcon);
cart.subscribe(notificationService);

// 4. Trigger state changes in the subject
cart.addItem({ name: 'Laptop', price: 1500 });
cart.addItem({ name: 'Mouse', price: 50 });

// Let's unsubscribe the notification service and add another item
console.log('\n--- Unsubscribing notifications ---');
cart.unsubscribe(notificationService);
cart.addItem({ name: 'Keyboard', price: 100 });

// Output:
// --- Added "Laptop" to cart ---
// Header Icon: Cart count is now 1.
// Notification: "Laptop" was added to your cart.
// --- Added "Mouse" to cart ---
// Header Icon: Cart count is now 2.
// Notification: "Mouse" was added to your cart.
//
// --- Unsubscribing notifications ---
// --- Added "Keyboard" to cart ---
// Header Icon: Cart count is now 3.
// (Notice: No notification was logged this time!)
```

### When to Use the Observer Pattern

Use this pattern when a change in one object requires changing other objects, and you don't want to couple these objects tightly.

-   **UI Development:** Keeping different parts of a UI synchronized with the application's state (this is the core of libraries/frameworks like React, Vue, and Angular).
-   **Event Systems:** The native DOM `addEventListener` is a perfect example of the Observer pattern. The DOM element is the subject, and your event listener function is the observer.
-   **State Management:** Centralized state stores (like Redux or Vuex) use this pattern. Components subscribe to changes in the state store and re-render when the state is updated.
-   **Real-time Data:** Pushing updates from a server to multiple clients (e.g., stock tickers, live sports scores).

### Pros & Cons

-   **Pros:**
    -   **Loose Coupling:** The Subject knows nothing about the concrete Observers, other than that they implement the `update` method. This makes your system more flexible and reusable.
    -   **Open/Closed Principle:** You can introduce new observer types without having to modify the subject's code.
    -   **Dynamic Relationships:** You can add or remove observers at any time during runtime.

-   **Cons:**
    -   **Performance Issues:** If there are many observers or the update logic is complex, the notification process can be slow.
    -   **Unexpected Update Order:** The subject typically notifies observers in an unpredictable order. If the order is important, you may need a more complex implementation.
    -   **Memory Leaks:** A common pitfall is the "lapsed listener" problem. If an observer is destroyed but not unsubscribed, the subject will hold a reference to it, preventing it from being garbage collected.
```
```

## 4. The Module Pattern

### Definition

The Module Pattern is a **structural pattern** used to create self-contained pieces of code with **private and public components**. It's the primary way to achieve **encapsulation** in classic JavaScript, hiding implementation details and only exposing a public API (Application Programming Interface).

Think of the dashboard of a car. You have a public interface (steering wheel, pedals, gear stick) that you use to operate the car. You don't need to know about the private, internal workings (the engine pistons, the fuel injection system). The Module Pattern does the same for your code: it wraps logic in a "box," hiding the complex parts and giving you simple controls to work with.

This pattern leverages JavaScript's function scope and closures to achieve privacy.

### Real-World Problem

Imagine you are creating a simple payment processor. You need to handle a secret API key.

If you create a simple object, the API key is exposed:

```javascript
const paymentProcessor = {
    apiKey: 'SECRET_12345_XYZ', // DANGER! Anyone can see and change this.
    processPayment: function(amount) {
        console.log(`Processing payment of $${amount} using key ${this.apiKey}`);
    }
};

// Any other part of the code can access and corrupt the key
paymentProcessor.apiKey = 'Haha, I stole your key!';
paymentProcessor.processPayment(100);
// Outputs: "Processing payment of $100 using key Haha, I stole your key!"
```

**The Problem:** There is no concept of "private" properties in a standard JavaScript object literal. Any part of your code can view and modify `apiKey`, leading to massive security vulnerabilities and bugs. You need a way to protect this internal state.

### The Solution: Using the Module Pattern

The Module Pattern solves this by using a function's scope. Variables declared inside a function are not accessible from the outside. By returning an object that contains only the functions we want to be public, we create a secure, encapsulated module.

### How to Use: Code Snippet (Classic IIFE Method)

The classic implementation uses an **IIFE (Immediately Invoked Function Expression)**.

```javascript
const PaymentProcessorModule = (function() {
    // --- PRIVATE SCOPE ---
    // This variable is "private". It cannot be accessed from outside the module.
    let privateApiKey = 'SECRET_12345_XYZ';
    let transactionCount = 0;

    function logTransaction(amount) {
        // This is a private function.
        transactionCount++;
        console.log(`[Log #${transactionCount}] New transaction for $${amount}`);
    }

    // --- PUBLIC API ---
    // We return an object. Only the properties on this object will be accessible from the outside.
    return {
        processPayment: function(amount) {
            // This public function can access the private variables and functions
            // because of a JavaScript feature called a "closure".
            logTransaction(amount);
            console.log(`Processing payment of $${amount} using a secret key.`);
        },

        getTransactions: function() {
            return `Total transactions processed: ${transactionCount}`;
        }
    };
})(); // The () at the end executes the function immediately.


// --- USAGE ---

// We interact with the module through its public API.
PaymentProcessorModule.processPayment(50);
PaymentProcessorModule.processPayment(120);

// We can get data from the public method.
console.log(PaymentProcessorModule.getTransactions()); // "Total transactions processed: 2"

// We CANNOT access the private variables directly.
console.log(PaymentProcessorModule.privateApiKey); // undefined
console.log(PaymentProcessorModule.transactionCount); // undefined
// PaymentProcessorModule.logTransaction(10); // Throws an error, it's not a function

```

### The Modern Way: ES6 Modules

The Module Pattern was so important that its concepts became a native feature in ECMAScript 2015 (ES6). Today, you would achieve the same result using `import` and `export`. The principle is identical: only what you `export` is public.

**`paymentProcessor.js` (a file acts as a module)**
```javascript
// This variable is private to this file (module).
let transactionCount = 0;

// This function is public because it is exported.
export function processPayment(amount) {
    transactionCount++;
    console.log(`Processing payment of $${amount}. Transaction #${transactionCount}`);
}

// This function is also public.
export function getReport() {
    return `Total transactions so far: ${transactionCount}`;
}
```

**`main.js` (another file)**
```javascript
import { processPayment, getReport } from './paymentProcessor.js';

processPayment(75);
processPayment(25);
console.log(getReport()); // "Total transactions so far: 2"

// You still cannot access `transactionCount` directly.
```

### When to Use the Module Pattern

- **Encapsulation:** Whenever you want to hide internal implementation details and expose a clean, public API.
- **Namespace Management:** To prevent your variables and functions from "polluting" the global scope, avoiding naming conflicts with other scripts or libraries.
- **Code Organization:** To group related functionality into a single, cohesive unit. (This is the primary use case for modern ES6 modules).

### Pros & Cons

- **Pros:**
    - **Encapsulation:** Protects your data's integrity by creating private state.
    - **Clean Namespace:** Avoids global variable conflicts.
    - **Organized Code:** Leads to a more structured and maintainable codebase.
    - **Reusable Components:** Modules are self-contained and can be easily reused across your application.

- **Cons (of the classic IIFE pattern):**
    - **Verbosity:** The IIFE syntax can look a bit strange to newcomers.
    - **Inflexible Privacy:** Once a variable is private, there's no way to access it from the outside, which can sometimes make testing more difficult.
    - **Superseded by ES6:** Native ES6 modules are now the standard and preferred way to write modular JavaScript. However, understanding the original pattern is crucial for understanding closures and older codebases.
```
```
## 5. The Decorator Pattern

### Definition

The Decorator Pattern is a **structural pattern** that allows you to **dynamically add new behaviors or responsibilities to an object** without modifying its source code. It achieves this by wrapping the original object in a special "decorator" object that shares the same interface.

Think of it like getting ice cream.
-   The **plain ice cream cone** is your original **object**.
-   Each **topping** (sprinkles, hot fudge, whipped cream) is a **decorator**.
-   Each topping adds flavor and cost (new behavior/state) to the base cone. You can combine toppings in any order you want, and the final product is still treated as "ice cream." You didn't have to create a new "IceCreamWithSprinklesAndFudge" class.

### Real-World Problem

Imagine you're building a car configuration tool for a dealership website. A customer starts with a `BasicCar`. They can then add optional extras like a sunroof, power windows, or leather seats. Each feature adds to the total cost and changes the car's description.

**The Problem:** How do you calculate the price of all possible combinations?

A naive approach would be to use inheritance:
- `class CarWithSunroof extends BasicCar`
- `class CarWithPowerWindows extends BasicCar`
- `class CarWithSunroofAndPowerWindows extends CarWithSunroof`

This leads to a **class explosion**. For just 3 options, you'd need `2^3 = 8` classes to cover all combinations. For 10 options, you'd need over 1000! This is completely unmanageable and violates the Open/Closed Principle because adding a new option (`HeatedSeats`) would require creating a whole new set of classes.

### The Solution: Using the Decorator Pattern

Instead of creating subclasses, you create "decorator" objects that wrap the car.

1.  Start with a `BasicCar` object.
2.  To add a sunroof, you wrap the `BasicCar` object in a `SunroofDecorator`.
3.  To *also* add power windows, you wrap the `SunroofDecorator` object in a `PowerWindowsDecorator`.

Each decorator adds its own cost and description to whatever object it is wrapping. The client code only ever interacts with the outermost wrapper, treating it just like a normal `Car` object.

### How to Use: Code Snippet

This example uses classes to clearly define the interfaces.

```javascript
// The "Component" Interface (the base object)
// In JS, this can be a base class or an informal agreement.
class Car {
    constructor() {
        this.cost = 20000;
        this.description = 'Basic Car';
    }

    getCost() {
        return this.cost;
    }

    getDescription() {
        return this.description;
    }
}

// --- Decorators ---
// These wrappers will add functionality. They must have the same interface as the object they wrap.

class Sunroof {
    constructor(car) {
        // The car to be decorated is passed into the constructor.
        this.car = car;
    }

    getCost() {
        // The magic! It gets the cost of the wrapped car and adds its own.
        return this.car.getCost() + 2000;
    }

    getDescription() {
        return this.car.getDescription() + ', with a Sunroof';
    }
}

class LeatherSeats {
    constructor(car) {
        this.car = car;
    }

    getCost() {
        return this.car.getCost() + 2500;
    }

    getDescription() {
        return this.car.getDescription() + ', with Leather Seats';
    }
}


// --- USAGE ---

// 1. Start with a basic car object.
let myCar = new Car();
console.log(`Cost: $${myCar.getCost()}, Description: ${myCar.getDescription()}`);

// 2. Decorate it with a sunroof.
myCar = new Sunroof(myCar);
console.log(`Cost: $${myCar.getCost()}, Description: ${myCar.getDescription()}`);

// 3. Decorate it again with leather seats.
myCar = new LeatherSeats(myCar);
console.log(`Cost: $${myCar.getCost()}, Description: ${myCar.getDescription()}`);

// We can also chain the decorators for a more complex configuration.
let anotherCar = new Car();
anotherCar = new LeatherSeats(new Sunroof(anotherCar)); // Wrap it inside-out
console.log(`\nAnother Car Cost: $${anotherCar.getCost()}`);
console.log(`Another Car Description: ${anotherCar.getDescription()}`);


// Output:
// Cost: $20000, Description: Basic Car
// Cost: $22000, Description: Basic Car, with a Sunroof
// Cost: $24500, Description: Basic Car, with a Sunroof, with Leather Seats
//
// Another Car Cost: $24500
// Another Car Description: Basic Car, with a Sunroof, with Leather Seats
```

### When to Use the Decorator Pattern

-   When you want to add responsibilities to objects dynamically without creating a complex hierarchy of subclasses.
-   When you want to avoid feature-laden classes. You can move optional functionality into decorators.
-   When the core object's functionality is fixed, but you need to combine it with various extensions. For example, adding different types of logging or validation to a data source.

### Pros & Cons

-   **Pros:**
    -   **Great Flexibility:** Far more flexible than inheritance. You can add any number of decorators in any combination at runtime.
    -   **Adheres to SOLID Principles:** Follows the Single Responsibility Principle (each decorator does one thing) and the Open/Closed Principle (you can add new decorators without changing existing code).
    -   **Clean Code:** Keeps your component classes lean and focused on their core task.

-   **Cons:**
    -   **Increased Complexity:** Can lead to a lot of small, similar-looking objects in your system, which can be hard to manage.
    -   **Debugging Can Be Tricky:** Tracing behavior through a long chain of decorators can be difficult.
    -   **Order Matters:** The order in which decorators are applied can affect the outcome, which may not be intuitive.
```

```
## 6. The Strategy Pattern

### Definition

The Strategy Pattern is a **behavioral pattern** that enables selecting an algorithm at runtime. Instead of implementing a single algorithm directly, code receives run-time instructions as to which in a family of algorithms to use. The pattern **encapsulates each algorithm into a separate class** and makes their objects interchangeable.

Think of it like using a GPS for directions.
-   The **Context** is your need to get from Point A to Point B.
-   The **Strategies** are the different travel modes: "Driving," "Walking," or "Public Transit."
-   You choose a strategy (a travel mode), and the GPS app (the context) executes that specific algorithm to give you the appropriate route and time estimate. You can easily switch between strategies to see different results.

### Real-World Problem

Imagine you're building an e-commerce checkout system. You need to calculate shipping costs, but there are multiple shipping providers (e.g., UPS, FedEx, Standard Mail), and each one calculates the cost differently.

A common but problematic approach is to use a large conditional block inside your main `ShoppingCart` class:

```javascript
class ShoppingCart {
    calculateShipping(package, method) {
        let cost = 0;
        if (method === 'ups') {
            // Complex UPS calculation logic...
            cost = package.weight * 0.45;
        } else if (method === 'fedex') {
            // Complex FedEx calculation logic...
            cost = package.weight * 0.55;
        } else if (method === 'standard') {
            // Complex Standard Mail logic...
            cost = package.weight * 0.25 + 5;
        }
        return cost;
    }
}
```

**The Problem:** This code is rigid and difficult to maintain. To add a new shipping method (like DHL), you have to modify the `ShoppingCart` class. This violates the **Open/Closed Principle**. The `ShoppingCart` class is also doing too much; its primary job should be managing items, not knowing the intricate details of every shipping calculation.

### The Solution: Using the Strategy Pattern

We can extract each calculation algorithm into its own "strategy" object. The `ShoppingCart` (the "Context") will hold a reference to a strategy object and delegate the calculation task to it. The `ShoppingCart` no longer needs to know *how* the calculation is done, only that it can be done.

### How to Use: Code Snippet

Here's how to refactor the shipping calculator using the Strategy Pattern.

```javascript
// --- The "Context" ---
// It maintains a reference to a Strategy object and delegates work to it.
class Shipping {
    constructor() {
        this.companyStrategy = null;
    }

    setStrategy(companyStrategy) {
        this.companyStrategy = companyStrategy;
    }

    calculate(package) {
        if (!this.companyStrategy) {
            throw new Error("Shipping strategy has not been set.");
        }
        // Delegate the calculation to the chosen strategy.
        return this.companyStrategy.calculate(package);
    }
}

// --- The "Strategies" ---
// Each strategy is a class with the same interface (a 'calculate' method).

class UPSShipping {
    calculate(package) {
        // In a real app, this would be a more complex calculation.
        console.log('Calculating shipping cost with UPS...');
        return package.weight * 0.45;
    }
}

class FedExShipping {
    calculate(package) {
        console.log('Calculating shipping cost with FedEx...');
        return package.weight * 0.55;
    }
}

class StandardShipping {
    calculate(package) {
        console.log('Calculating shipping cost with Standard Mail...');
        return package.weight * 0.25 + 5;
    }
}

// --- USAGE ---

// Create the context
const shipping = new Shipping();

// Create a sample package
const myPackage = { from: 'New York', to: 'Los Angeles', weight: 10 };

// 1. Calculate using UPS
shipping.setStrategy(new UPSShipping());
const upsCost = shipping.calculate(myPackage);
console.log(`UPS Cost: $${upsCost}`);

// 2. Switch the strategy to FedEx at runtime
shipping.setStrategy(new FedExShipping());
const fedexCost = shipping.calculate(myPackage);
console.log(`FedEx Cost: $${fedexCost}`);

// 3. Switch again to Standard Mail
shipping.setStrategy(new StandardShipping());
const standardCost = shipping.calculate(myPackage);
console.log(`Standard Mail Cost: $${standardCost}`);


// Output:
// Calculating shipping cost with UPS...
// UPS Cost: $4.5
// Calculating shipping cost with FedEx...
// FedEx Cost: $5.5
// Calculating shipping cost with Standard Mail...
// Standard Mail Cost: $7.5
```

### When to Use the Strategy Pattern

-   When you have multiple variants of an algorithm for a task, and you want to let the client choose which one to use.
-   When you want to avoid exposing complex, algorithm-specific data structures to the client.
-   When a class defines many behaviors, and these appear as multiple conditional statements in its operations. Strategy lets you move each branch of the conditional into its own class.
-   Common examples:
    -   Payment gateways (`StripeStrategy`, `PayPalStrategy`)
    -   Sorting algorithms (`QuickSortStrategy`, `BubbleSortStrategy`)
    -   Validation rules (`EmailValidationStrategy`, `PasswordStrengthStrategy`)

### Pros & Cons

-   **Pros:**
    -   **Interchangeable Algorithms:** You can swap algorithms at runtime.
    -   **Follows SOLID Principles:** Adheres to the Open/Closed Principle (you can introduce new strategies without changing the context) and Single Responsibility Principle (each strategy class has one job).
    -   **Cleaner Code:** Eliminates large conditional blocks, making the context class simpler and easier to read.
    -   **Isolation & Testing:** The algorithms are isolated in their own classes, making them easier to test independently.

-   **Cons:**
    -   **Increased Complexity:** Introduces more objects into the application, which can be overkill for a small number of simple algorithms.
    -   **Client Awareness:** The client must understand the differences between strategies to be able to select the appropriate one.
```
```

## 7. The Facade Pattern

### Definition

The Facade Pattern is a **structural pattern** that provides a **simplified, higher-level interface** to a larger body of code, such as a complex subsystem or a set of libraries.

Think of the front desk at a hotel.
-   The **complex subsystem** is the entire hotel's operation: the booking system, the housekeeping department, the kitchen, the bellhops, etc.
-   The **Facade** is the front desk clerk.
-   As a guest (the **client**), you don't need to interact with each of these subsystems individually. You just make a simple request to the clerk, like "I'd like to check in" or "Please send a meal to my room." The clerk (the facade) handles all the complex interactions with the other departments on your behalf.

### Real-World Problem

Imagine you're building a feature that allows a user to purchase a movie ticket online. The process involves interacting with several different, complicated services:

1.  `AuthService`: To verify the user is logged in.
2.  `MovieDB`: To find the movie and check showtimes.
3.  `SeatingSystem`: To check for available seats and reserve them.
4.  `PaymentGateway`: To process the credit card payment.
5.  `NotificationService`: To send an email confirmation to the user.

Your client-side code (e.g., the "Buy Ticket" button's event handler) would be a mess:

```javascript
// The "bad" way - client is coupled to many subsystems
function onBuyTicketClick(user, movieId, seatNumber) {
    // 1. Authenticate user
    if (!AuthService.isLoggedIn(user.token)) {
        console.error("User not logged in!");
        return;
    }

    // 2. Find the movie
    const movie = MovieDB.findMovie(movieId);
    if (!movie) { /* handle error */ }

    // 3. Reserve the seat
    const seatReserved = SeatingSystem.reserve(movieId, seatNumber);
    if (!seatReserved) { /* handle error */ }

    // 4. Process payment
    const paymentSuccess = PaymentGateway.charge(user.creditCard, movie.price);
    if (!paymentSuccess) {
        // Oh no, we need to un-reserve the seat!
        SeatingSystem.unreserve(movieId, seatNumber);
        return;
    }

    // 5. Send confirmation
    NotificationService.sendEmail(user.email, "Your ticket is confirmed!");
    console.log("Ticket purchased successfully!");
}
```

**The Problem:** This code is complex, hard to read, and brittle. The client code is **tightly coupled** to five different subsystems. If the `SeatingSystem` API changes, you have to update this client code. The "buy ticket" logic, including complex error handling (like un-reserving a seat), is repeated everywhere you need this functionality.

### The Solution: Using a Facade

Create a `TicketPurchaseFacade` that encapsulates this entire workflow. The client code will now only need to make a single, simple call to the facade.

### How to Use: Code Snippet

First, let's simulate the complex subsystems.

```javascript
// --- The Complex Subsystems ---
// We don't need to know their inner workings, just that they exist.

class AuthService {
    isLoggedIn(userToken) {
        return userToken === 'valid-token';
    }
}

class MovieDB {
    findMovie(movieId) {
        console.log(`Finding movie with ID: ${movieId}`);
        return { name: 'The Matrix', price: 12 };
    }
}

class SeatingSystem {
    reserve(movieId, seatNumber) {
        console.log(`Reserving seat ${seatNumber} for movie ${movieId}`);
        return true; // Assume success
    }
    unreserve(movieId, seatNumber) {
        console.log(`Seat ${seatNumber} for ${movieId} has been released.`);
    }
}

class PaymentGateway {
    charge(cardInfo, amount) {
        console.log(`Charging $${amount} to card ${cardInfo.number}`);
        return true; // Assume success
    }
}

class NotificationService {
    sendEmail(email, message) {
        console.log(`Sending email to ${email}: ${message}`);
    }
}


// --- The Facade ---
// This is our simplified interface.

class TicketPurchaseFacade {
    constructor() {
        this.auth = new AuthService();
        this.movies = new MovieDB();
        this.seating = new SeatingSystem();
        this.payment = new PaymentGateway();
        this.notify = new NotificationService();
    }

    // The single, simple method the client will use.
    purchaseTicket(user, movieId, seatNumber) {
        console.log('--- Starting ticket purchase process ---');

        if (!this.auth.isLoggedIn(user.token)) {
            return { success: false, error: 'User not authenticated.' };
        }

        const movie = this.movies.findMovie(movieId);
        if (!movie) {
            return { success: false, error: 'Movie not found.' };
        }

        if (!this.seating.reserve(movieId, seatNumber)) {
            return { success: false, error: 'Seat could not be reserved.' };
        }

        if (!this.payment.charge(user.creditCard, movie.price)) {
            // Important! Facade handles complex rollback logic.
            this.seating.unreserve(movieId, seatNumber);
            return { success: false, error: 'Payment failed.' };
        }

        this.notify.sendEmail(user.email, `Your ticket for "${movie.name}" is confirmed!`);

        console.log('--- Ticket purchase process finished successfully! ---');
        return { success: true };
    }
}

// --- USAGE ---

const facade = new TicketPurchaseFacade();

const user = {
    token: 'valid-token',
    email: 'john.doe@example.com',
    creditCard: { number: '1234-5678-9012-3456' }
};

// The client code is now incredibly simple!
const result = facade.purchaseTicket(user, 'movie-123', 'F7');

console.log('Purchase result:', result);

```

### When to Use the Facade Pattern

-   When you have a complex subsystem and you want to provide a simple, limited interface to it for clients.
-   When you want to **decouple** your application's client code from the inner workings of its subsystems. This makes the subsystem easier to update or replace later.
-   When you want to create a layered architecture. Facades can be the entry points to each layer. For example, a `DataAccessFacade` could hide the complexities of your database interactions (whether you're using SQL, NoSQL, or local storage).

### Pros & Cons

-   **Pros:**
    -   **Simplicity:** Hides complexity from the client, making the code easier to use and understand.
    -   **Decoupling:** Isolates the client from changes in the subsystem. If you swap your payment gateway from Stripe to PayPal, you only need to update the Facade, not every piece of client code that uses it.
    -   **Centralized Logic:** Provides a single "choke point" for a complex task, which is great for logging, error handling, and security.

-   **Cons:**
    -   **Can Become a "God Object":** The facade can become coupled to too many subsystems and take on too many responsibilities, becoming an anti-pattern itself.
    -   **Hides Features:** A simplified interface might hide useful features of the underlying subsystems that some advanced clients might need. (Good facade design often allows "power users" to bypass the facade and access the subsystem directly if needed).
```
```

## 8. The Proxy Pattern

### Definition

The Proxy Pattern is a **structural pattern** that provides a **substitute or placeholder for another object to control access to it**. The Proxy object has the exact same interface as the "real" object it is proxying, allowing it to be used interchangeably. This lets the proxy perform actions—like checking permissions, caching data, or logging—before or after the request gets to the original object.

Think of a credit card.
-   The **Real Object** is your bank account, which holds your actual money.
-   The **Proxy** is your credit card.
-   The credit card has the same interface as your cash ("make a purchase"), but it adds a layer of control. It can check if you have sufficient funds, block fraudulent transactions, and log all your purchases before it ever touches your actual bank account.

**Proxy vs. Facade vs. Decorator:**
-   **Facade:** Provides a *simplified*, different interface to a complex system.
-   **Decorator:** *Adds* functionality to an object, often by wrapping it. It enhances the object.
-   **Proxy:** *Controls access* to an object and has the *same* interface. It acts as a gatekeeper.

### Real-World Problem

Imagine you have a `FileSystem` API that can read and write sensitive files. You need to implement an access control system where only users with an 'admin' role can write to a file, but any user can read it.

A bad approach would be to put this logic inside the `FileSystem` class itself.

```javascript
class FileSystem {
    // ... other methods
    writeFile(path, content, user) {
        if (user.role !== 'admin') {
            console.error("Access Denied: You must be an admin to write files.");
            return;
        }
        // ... actual file writing logic
        console.log(`Writing to ${path}`);
    }
}
```

**The Problem:** The `FileSystem` class is now concerned with both file operations *and* user authentication. This violates the **Single Responsibility Principle**. What if you need a different security rule for a different file? Or what if you want to use the `FileSystem` in a context where there are no users? The class becomes less reusable and more complex.

### The Solution: Using a Proxy

We create a `SecureFileSystemProxy` that wraps the real `FileSystem`. The client code will interact with the proxy, thinking it's the real thing. The proxy will check the user's permissions before delegating the `writeFile` call to the real `FileSystem` object.

### How to Use: Code Snippet (Class-based)

```javascript
// 1. The "Real Subject" - The object we want to control access to.
class RealFileSystem {
    readFile(path) {
        return `Contents of ${path}`;
    }

    writeFile(path, content) {
        console.log(`Writing "${content}" to ${path}`);
        return true;
    }
}

// 2. The "Proxy" - It has the same interface as the Real Subject.
class SecureFileSystemProxy {
    constructor(realFileSystem, user) {
        this.fileSystem = realFileSystem;
        this.user = user;
    }

    // This method is a simple pass-through.
    readFile(path) {
        return this.fileSystem.readFile(path);
    }

    // This method has the security logic.
    writeFile(path, content) {
        if (this.user.role === 'admin') {
            // If authorized, delegate to the real object.
            return this.fileSystem.writeFile(path, content);
        } else {
            console.error("ACCESS DENIED: You do not have permission to write.");
            return false;
        }
    }
}

// --- USAGE ---

const realFS = new RealFileSystem();
const regularUser = { name: 'John', role: 'user' };
const adminUser = { name: 'Jane', role: 'admin' };

// Create a proxy for the regular user.
const userFileSystem = new SecureFileSystemProxy(realFS, regularUser);

// Create a proxy for the admin user.
const adminFileSystem = new SecureFileSystemProxy(realFS, adminUser);

console.log('--- Regular User Actions ---');
console.log(userFileSystem.readFile('config.txt')); // Works
userFileSystem.writeFile('app.log', 'Error occurred');   // Fails

console.log('\n--- Admin User Actions ---');
console.log(adminFileSystem.readFile('config.txt'));   // Works
adminFileSystem.writeFile('app.log', 'System shutdown'); // Works


// Output:
// --- Regular User Actions ---
// Contents of config.txt
// ACCESS DENIED: You do not have permission to write.
//
// --- Admin User Actions ---
// Contents of config.txt
// Writing "System shutdown" to app.log
```

### The Modern Way: ES6 `Proxy` Object

JavaScript has a native `Proxy` object that is perfect for this pattern. It allows you to intercept operations on a target object.

```javascript
const realFS = new RealFileSystem();
const adminUser = { name: 'Jane', role: 'admin' };

const fileSystemProxy = new Proxy(realFS, {
    // The 'handler' object contains "traps" for operations.
    // 'get' trap is called when a property is accessed.
    get(target, property) {
        if (property === 'writeFile') {
            // Return a new function that wraps the original.
            return function(path, content) {
                if (adminUser.role === 'admin') {
                    // Call the original method on the target object.
                    return target[property].apply(target, arguments);
                } else {
                    console.error("ACCESS DENIED!");
                }
            };
        }
        // For all other properties, just return the original.
        return target[property];
    }
});

// Usage is now on the proxy object
console.log(fileSystemProxy.readFile('config.txt'));
fileSystemProxy.writeFile('test.txt', 'hello from proxy'); // Will work
```

### When to Use the Proxy Pattern

Use it when you want to add a layer of control over an object without the client needing to know.

-   **Virtual Proxy:** Lazy loading. The proxy can represent a large object (like a high-res image or complex data). It only loads the real object when it's actually needed.
-   **Protection Proxy:** Controlling access based on permissions, as in our example.
-   **Caching Proxy:** The proxy can cache the results of expensive operations. The next time the operation is called with the same arguments, the proxy returns the cached result instead of calling the real object.
-   **Logging Proxy:** The proxy can log all calls to the real object's methods for debugging or analytics.

### Pros & Cons

-   **Pros:**
    -   **Control:** You can manage the lifecycle of the real object or control access to it without the object's or the client's knowledge.
    -   **Decoupling:** The proxy decouples the control logic from the business logic of the real object.
    -   **Powerful (ES6):** The native `Proxy` object in JavaScript is extremely powerful for metaprogramming, allowing you to intercept almost any interaction with an object.

-   **Cons:**
    -   **Complexity:** It introduces another layer of abstraction, which can make the code harder to understand.
    -   **Performance:** The indirection can add a small performance overhead to every call.
    -   **Can be Overused:** It's a powerful tool, but simple conditional checks might be sufficient in many cases.
```
```

## 9. The Builder Pattern

### Definition

The Builder Pattern is a **creational pattern** designed to **separate the construction of a complex object from its representation**. It allows you to create complex objects step-by-step. The final object is only "built" and returned after all the necessary construction steps have been completed.

Think of ordering a sandwich at Subway.
-   The **complex object** is your final, customized sandwich.
-   The **Builder** is the sandwich artist behind the counter.
-   You (the **Director**) don't build the sandwich yourself. You give a series of simple, step-by-step instructions to the builder: "Start with wheat bread," "add turkey," "provolone cheese," "toast it," "add lettuce and tomatoes."
-   The builder follows these steps, and only when you say "that's it," do they wrap it up and give you the final `Sandwich` object.

### Real-World Problem

Imagine you need to create a `User` profile object. A user can have many optional configuration settings: a name, email, bio, profile picture, location, notification preferences, etc.

A common anti-pattern is the "telescoping constructor":

```javascript
// The "bad" way - Telescoping Constructor
class User {
    constructor(name, email, bio, profilePic, location, receivesNewsletter, isPremium) {
        this.name = name;
        this.email = email;
        this.bio = bio;
        // ... and so on
    }
}

// Creating a user is a nightmare. What do the `null`s even mean?
const user1 = new User('John Doe', 'john@test.com', null, null, 'New York', true, false);

// Creating another user is just as bad and error-prone.
const user2 = new User('Jane Smith', 'jane@test.com', 'Loves dogs', null, null, false, true);
```

**The Problem:** This is terrible for several reasons:
1.  **Hard to Read:** You have to remember the exact order of all parameters.
2.  **Error-Prone:** It's very easy to mix up the order of `true`, `false`, and `null` values.
3.  **Inflexible:** If you want to add a new optional parameter, you have to change the constructor signature, which could break all existing code that uses it.

Another approach is to pass a giant configuration object, but this can bypass validation and make the constructor's logic very complex.

### The Solution: Using a Builder

The Builder pattern solves this by providing a fluent, step-by-step interface for constructing the object. Each step is a clear, self-documenting method call.

### How to Use: Code Snippet

Let's refactor the `User` creation using a `UserBuilder`.

```javascript
// The "Product" - The complex object we want to build.
// Its constructor is simple and just accepts the final configuration.
class User {
    constructor({ name, email, bio = '', profilePic = 'default.jpg', location = 'Unknown', receivesNewsletter = false }) {
        this.name = name;
        this.email = email;
        this.bio = bio;
        this.profilePic = profilePic;
        this.location = location;
        this.receivesNewsletter = receivesNewsletter;
    }

    toString() {
        return JSON.stringify(this, null, 2);
    }
}

// The "Builder" - Provides the step-by-step construction interface.
class UserBuilder {
    constructor(name, email) {
        // Required parameters are set in the constructor.
        if (!name || !email) {
            throw new Error("Name and email are required.");
        }
        this.user = { name, email };
    }

    // Each of the following methods represents a step.
    // They return `this` to allow for method chaining.
    withBio(bio) {
        this.user.bio = bio;
        return this;
    }

    withProfilePic(url) {
        this.user.profilePic = url;
        return this;
    }

    withLocation(location) {
        this.user.location = location;
        return this;
    }

    wantsNewsletter(wants) {
        this.user.receivesNewsletter = wants;
        return this;
    }

    // The final step that returns the fully constructed object.
    build() {
        return new User(this.user);
    }
}

// --- USAGE ---

// The client code is now extremely readable and less error-prone.

console.log('--- Building a simple user ---');
const simpleUser = new UserBuilder('John Doe', 'john@test.com').build();
console.log(simpleUser.toString());


console.log('\n--- Building a complex user ---');
const complexUser = new UserBuilder('Jane Smith', 'jane@test.com')
    .withBio('Software developer and dog lover.')
    .withLocation('San Francisco')
    .wantsNewsletter(true)
    .build();

console.log(complexUser.toString());
```

### When to Use the Builder Pattern

-   When the creation of an object involves many optional parameters or requires a multi-step process.
-   When you want to create immutable objects. The builder can gather all the data, and the final object's constructor can set all properties, with no setters exposed afterward.
-   When you need to create different representations of the same object. For example, the same build process could be used by a `JSONBuilder` or an `XMLBuilder`.

### Pros & Cons

-   **Pros:**
    -   **Improved Readability:** The step-by-step, fluent interface makes object creation self-documenting. `new UserBuilder().withBio(...)` is much clearer than `new User(..., 'some bio', ...)`
    -   **Encapsulates Complexity:** The logic and validation for constructing the object are hidden away in the builder, not in a massive constructor.
    -   **Flexibility:** It's easy to add new optional parameters by simply adding a new method to the builder, without breaking existing code.
    -   **Finer Control:** You can add validation logic inside each builder step.

-   **Cons:**
    -   **Increased Verbosity:** Requires creating a separate `Builder` class for each complex object, which can feel like boilerplate code for simpler cases.
    -   **Coupling:** The builder is tightly coupled to the product it creates.
```
```

## 10. The Chain of Responsibility Pattern

### Definition

The Chain of Responsibility is a **behavioral pattern** that lets you pass a request along a **chain of potential handlers**. Upon receiving a request, each handler decides either to **process the request** or to **pass it to the next handler** in the chain.

Think of an automated customer support system.
1.  You (the **Request**) make a call with a problem.
2.  The first **Handler** is an automated bot. It tries to understand your request. If it can solve it (e.g., "What's my balance?"), it processes it and the chain ends.
3.  If the bot can't solve it, it **passes the request** to the next handler in the chain: a Tier 1 human support agent.
4.  If the Tier 1 agent can't solve it (e.g., a complex technical issue), they pass it to the next handler: a Tier 2 specialist, and so on.

The key idea is that the original sender of the request doesn't know (and doesn't care) which handler will ultimately process it.

### Real-World Problem

Imagine you're building a data validation pipeline for a web form. You have several validation rules to apply to an incoming request:
1.  Check if required fields are present.
2.  Check if the email address is a valid format.
3.  Check if the password meets the minimum strength requirements.

A common but messy approach is to nest a bunch of `if/else` statements in a single function:

```javascript
// The "bad" way - A monolithic validation function
function validateRequest(data) {
    if (!data.username || !data.email || !data.password) {
        return { valid: false, error: 'Required fields are missing.' };
    } else {
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(data.email)) {
            return { valid: false, error: 'Invalid email format.' };
        } else {
            if (data.password.length < 8) {
                return { valid: false, error: 'Password must be at least 8 characters long.' };
            } else {
                // ... more and more nested checks
                return { valid: true };
            }
        }
    }
}
```

**The Problem:** This code is a nightmare to read, maintain, and extend. Adding a new validation rule means adding another level of nesting. Reordering the rules is difficult. Reusing a specific rule (like email validation) elsewhere is impossible without copy-pasting code. This violates the **Single Responsibility** and **Open/Closed** principles.

### The Solution: Using the Chain of Responsibility

We can model each validation rule as a "handler" in a chain. Each handler will have a `setNext()` method to link it to the next handler and a `handle()` method to perform its check. If its own check passes, it calls `handle()` on the next handler in the chain. If its check fails, it stops the chain and returns an error immediately.

### How to Use: Code Snippet

```javascript
// The "Handler" Interface (or base class)
// It defines the methods for building and executing the chain.
class AbstractValidator {
    constructor() {
        this.nextValidator = null;
    }

    setNext(validator) {
        this.nextValidator = validator;
        return validator; // Return the next validator to allow for chaining setup
    }

    // The main method to start the chain.
    handle(data) {
        if (this.nextValidator) {
            // Pass it to the next link in the chain.
            return this.nextValidator.handle(data);
        }
        // End of the chain
        return { valid: true };
    }
}

// --- Concrete Handlers ---

class RequiredFieldsValidator extends AbstractValidator {
    handle(data) {
        console.log("Checking for required fields...");
        if (!data.username || !data.email || !data.password) {
            return { valid: false, error: 'Required fields are missing.' };
        }
        // If validation passes, call the parent's handle method
        // which will pass it to the next in the chain.
        return super.handle(data);
    }
}

class EmailFormatValidator extends AbstractValidator {
    handle(data) {
        console.log("Checking email format...");
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(data.email)) {
            return { valid: false, error: 'Invalid email format.' };
        }
        return super.handle(data);
    }
}

class PasswordStrengthValidator extends AbstractValidator {
    handle(data) {
        console.log("Checking password strength...");
        if (data.password.length < 8) {
            return { valid: false, error: 'Password must be at least 8 characters long.' };
        }
        return super.handle(data);
    }
}


// --- USAGE ---

// 1. Create instances of our validators.
const required = new RequiredFieldsValidator();
const email = new EmailFormatValidator();
const password = new PasswordStrengthValidator();

// 2. Build the chain.
required.setNext(email).setNext(password);
// The chain is now: required -> email -> password

// 3. Start the process by calling handle() on the first handler.
console.log("--- Testing valid data ---");
const validData = { username: 'john_doe', email: 'john@test.com', password: 'password123' };
console.log(required.handle(validData));

console.log("\n--- Testing invalid email ---");
const invalidEmailData = { username: 'jane_doe', email: 'jane@test', password: 'password123' };
console.log(required.handle(invalidEmailData));

console.log("\n--- Testing weak password ---");
const weakPasswordData = { username: 'mike', email: 'mike@test.com', password: '123' };
console.log(required.handle(weakPasswordData));

```

### When to Use the Chain of Responsibility Pattern

-   When you want to decouple the sender of a request from its receivers.
-   When more than one object may handle a request, and the handler isn't known beforehand. The handler is determined automatically at runtime.
-   When you want to issue a request to one of several objects without specifying the receiver explicitly.
-   Common examples:
    -   **Middleware in web frameworks** (like Express.js or Koa). Each middleware function is a handler in a chain that processes an incoming HTTP request.
    -   **Event bubbling in the DOM.** An event fired on an element "bubbles up" the chain of its parent elements, giving each one a chance to handle it.
    -   **Validation pipelines**, as in our example.
    -   **Discount/Promotion application.** A chain could apply a percentage discount, then a fixed discount, then a free shipping promotion.

### Pros & Cons

-   **Pros:**
    -   **Loose Coupling:** The sender only knows about the first handler in the chain. Handlers don't need to know about each other, only how to pass a request to the *next* one.
    -   **Follows SOLID Principles:** Adheres to the Single Responsibility Principle (each handler does one thing) and the Open/Closed Principle (you can add new handlers to the chain without modifying existing ones).
    -   **Increased Flexibility:** You can change the order of the chain or add/remove handlers dynamically at runtime.

-   **Cons:**
    -   **Request May Go Unhandled:** There's no guarantee that a request will be handled if it falls off the end of the chain.
    -   **Debugging Can Be Difficult:** It can be hard to trace the flow of a request and observe which handler processed it, especially with long chains.
    -   **Circular Chains:** Care must be taken to avoid creating a circular reference where a request gets passed around in a loop forever.
```
```

## 11. The Command Pattern

### Definition

The Command Pattern is a **behavioral pattern** that turns a request into a **stand-alone object** containing all information about the request. This transformation lets you parameterize methods with different requests, delay or queue a request's execution, and support undoable operations.

Think of ordering food at a restaurant.
-   You (the **Client**) decide what you want to eat.
-   The order slip (the **Command**) encapsulates your request ("Steak, medium-rare").
-   The waiter (the **Invoker**) takes the order slip and places it in the kitchen. The waiter doesn't know how to cook a steak; they only know how to accept and trigger an order.
-   The chef (the **Receiver**) is the one who reads the order slip and performs the actual action of cooking the steak.

The key benefit is that the waiter (Invoker) is completely decoupled from the chef (Receiver). A new chef could be hired, or the cooking process could change, and the waiter's job remains exactly the same.

### Real-World Problem

Imagine you're building a simple calculator application. The UI has buttons for operations like "add," "subtract," etc. You also want to keep a history of operations to implement an "undo" feature.

A naive approach would be to have each button's click handler call the calculator's methods directly.

```javascript
// The "bad" way - tight coupling
const calculator = new Calculator();
const history = [];

addButton.onClick = () => {
    const value = getInputValue();
    calculator.add(value);
    history.push({ operation: 'add', value }); // Manual history tracking
};

subtractButton.onClick = () => {
    const value = getInputValue();
    calculator.subtract(value);
    history.push({ operation: 'subtract', value });
};

undoButton.onClick = () => {
    const lastOp = history.pop();
    // Complex switch statement to reverse the operation
    if (lastOp.operation === 'add') {
        calculator.subtract(lastOp.value); // The opposite action
    } else if (lastOp.operation === 'subtract') {
        calculator.add(lastOp.value);
    }
    // ... this gets very complicated!
};
```

**The Problem:** The UI code (the invoker) is tightly coupled to the calculator's logic (the receiver). The undo logic is complex, centralized, and must be updated every time you add a new operation. This violates the **Open/Closed Principle** and the **Single Responsibility Principle**.

### The Solution: Using the Command Pattern

We can encapsulate each operation into a `Command` object. Each command object will have an `execute()` method to perform the action and an `undo()` method to reverse it. The UI buttons will simply execute these commands. An invoker object can keep a history of executed commands, making undo trivial.

### How to Use: Code Snippet

```javascript
// 1. The "Receiver" - The object that will perform the actual work.
class Calculator {
    constructor() {
        this.value = 0;
        console.log(`Calculator starting at: ${this.value}`);
    }

    add(amount) {
        this.value += amount;
        console.log(`Added ${amount}. Current value: ${this.value}`);
    }

    subtract(amount) {
        this.value -= amount;
        console.log(`Subtracted ${amount}. Current value: ${this.value}`);
    }
}

// 2. The "Command" Interface (conceptually) and Concrete Commands.
class AddCommand {
    constructor(calculator, amount) {
        this.calculator = calculator;
        this.amount = amount;
    }

    execute() {
        this.calculator.add(this.amount);
    }

    undo() {
        this.calculator.subtract(this.amount);
    }
}

class SubtractCommand {
    constructor(calculator, amount) {
        this.calculator = calculator;
        this.amount = amount;
    }

    execute() {
        this.calculator.subtract(this.amount);
    }

    undo() {
        this.calculator.add(this.amount);
    }
}

// 3. The "Invoker" - Knows how to execute a command and can keep track of history.
class CommandProcessor {
    constructor() {
        this.history = [];
    }

    execute(command) {
        console.log(`--- Executing Command: ${command.constructor.name} ---`);
        command.execute();
        this.history.push(command);
    }

    undo() {
        console.log('--- Undoing last command ---');
        const command = this.history.pop();
        if (command) {
            command.undo();
        } else {
            console.log("No commands to undo.");
        }
    }
}


// --- USAGE ---

// Client code
const calculator = new Calculator();
const invoker = new CommandProcessor();

// Create and execute commands
invoker.execute(new AddCommand(calculator, 10));
invoker.execute(new AddCommand(calculator, 5));
invoker.execute(new SubtractCommand(calculator, 3));

// Now, let's undo the last two operations
invoker.undo();
invoker.undo();
```

### When to Use the Command Pattern

-   **To implement undo/redo functionality.** This is the classic use case.
-   **When you want to queue operations.** A command object has all the information needed to be executed later, so you can put it in a queue for background processing.
-   **When you want to parameterize objects with an action.** For example, UI buttons or menu items can be configured with a command object to execute, rather than having their logic hard-coded.
-   **To create a history of requests.** You can log commands as they are executed, which can be useful for debugging or creating macros.

### Pros & Cons

-   **Pros:**
    -   **Decouples Objects:** Decouples the object that invokes the operation from the one that knows how to perform it.
    -   **Follows SOLID Principles:** Adheres to the Single Responsibility Principle (commands are focused on one thing) and the Open/Closed Principle (you can add new commands without changing existing code).
    -   **Undo/Redo is Easy:** Implementing undo/redo becomes straightforward.
    *   **Composition:** You can assemble a sequence of commands into a single "macro" command.

-   **Cons:**
    -   **Increased Complexity:** Introduces many new classes/objects, which can feel like overkill for simple applications. Every single action requires a new command class, adding boilerplate.
```
```
