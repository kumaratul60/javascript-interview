/**
Polymorphism is the ability of objects of different classes to be treated as if they were objects of the same class. 
*/

class Shape {
    draw() {
        console.log('Drawing shape...');
    }
}

class Circle extends Shape {
    draw() {
        console.log('Drawing circle...');
    }
}

class Square extends Shape {
    draw() {
        console.log('Drawing square...');
    }
}

function drawShapes(shapes) {
    shapes.forEach(shape => {
        shape.draw();
    });
}

const shapes = [
    new Circle(),
    new Square(),
    new Circle(),
    new Square()
];

drawShapes(shapes);