var sketchProc = function (processingInstance) {
    with (processingInstance) {
        var Circle = function(x, y, diameter) {
            this.x = x;
            this.y = y;
            this.diameter = diameter;
        };
        
        var Line = function(x1, y1, x2, y2) {
            this.x1 = x1;
            this.y1 = y1;
            this.x2 = x2;
            this.y2 = y2;
            this.m = (y2-y1)/(x2-x1);
            this.b = this.m * -x1 + y1;
        };
        
        var selectedR = 38;
        var selectedG = 77;
        var selectedB = 64;
        
        var defaultR = 170;
        var defaultG = 213;
        var defaultB = 198;
        
        Circle.prototype.draw = function(r,g,b) {
            if (r === undefined) {
                r = defaultR;
                g = defaultG;
                b = defaultB;
            }
            stroke(r,g,b);
            fill(r,g,b);
            ellipse(this.x, this.y, this.diameter, this.diameter);
        };
        
        var lines = [];
        
        // draws line from bottom of circle to top of toCircle
        Circle.prototype.drawLineTo = function(toCircle, r,g,b) {
            if (r === undefined) {
                r = defaultR;
                g = defaultG;
                b = defaultB;
            }
            stroke(r,g,b);
            fill(r,g,b);
            lines.push(new Line(this.x, this.y + this.diameter/2, toCircle.x, toCircle.y - toCircle         .diameter/2));
            line(this.x, this.y + this.diameter/2, toCircle.x, toCircle.y - toCircle.diameter/2);
        };
        
        var offCenterX = 120;
        var centerX = 200;
        var centerY = 200;
        var offCenterY = 60;
        var diameter = 50;
        
        var circleA = new Circle(centerX,centerY - offCenterY,diameter,diameter);
        var circle1 = new Circle(centerX - offCenterX,centerY + offCenterY,diameter,diameter);
        var circle2 = new Circle(centerX,centerY + offCenterY,diameter,diameter);
        var circle3 = new Circle(centerX + offCenterX,centerY + offCenterY,diameter,diameter);
        
        var drawCircles = function() {
            
            background(255, 255, 255);
            fill(defaultR, defaultG, defaultB);
            stroke(defaultR, defaultG, defaultB);
        
            circleA.draw();
            circle1.draw();
            circle2.draw();
            circle3.draw();
            
            circleA.drawLineTo(circle1);
            circleA.drawLineTo(circle2);
            circleA.drawLineTo(circle3);
        };
            
        
        var inCircle = function(circle) {
            var distance = dist(mouseX, mouseY, circle.x, circle.y);
            if (distance <= circle.diameter/2) {
                return true;
            }
            return false;
        };
        
        var onLineSeg = function(line, errorMargin) {
            if (mouseY < max(line.y1, line.y2) + errorMargin && mouseY > min(line.y1, line.y2) -           errorMargin && mouseX < max(line.x1, line.x2) + errorMargin && mouseX > min(line.x1,         line.x2) - errorMargin) {
                return true;
            }
            return false;
        };
        
        var onLine = function(line) {
            var errorMargin = 5;
            var left = mouseY;
            var right = mouseX*line.m + line.b;
        
            if (line.m === Infinity) {
                if (mouseX < line.x1 + errorMargin && mouseX > line.x1 - errorMargin && mouseY <               line.y2 + errorMargin/2 & mouseY > line.y1 + errorMargin/2) {
                    return true;
                }
                return false;
            }
        
            if (mouseY < mouseX*line.m + line.b + errorMargin && mouseY > mouseX*line.m + line.b -         errorMargin && onLineSeg(line, errorMargin)) {
                return true;
            }
            return false;
        };
        
        mouseClicked = function() {
            stroke(255, 0, 0);
            drawCircles();
            if (inCircle(circleA)) {
                indexVue.selectCircleA();
                circleA.draw(selectedR,selectedG,selectedB);
            }
            else if (inCircle(circle1) || inCircle(circle2) || inCircle(circle3)) {
                indexVue.selectCircleSub();
                circle1.draw(selectedR,selectedG,selectedB);
                circle2.draw(selectedR,selectedG,selectedB);
                circle3.draw(selectedR,selectedG,selectedB);
            }
            else if (onLine(lines[0]) || onLine(lines[1]) || onLine(lines[2])) {
                indexVue.selectLines();
                circleA.drawLineTo(circle1, selectedR,selectedG,selectedB);
                circleA.drawLineTo(circle2, selectedR,selectedG,selectedB);
                circleA.drawLineTo(circle3, selectedR,selectedG,selectedB);
            }
        
        };

        size(400, 400);
        frameRate(30);
        drawCircles();
    }
};

// Get the canvas that Processing-js will use
var canvas = document.getElementById("diagramCanvas");
// Pass the function sketchProc (defined in myCode.js) to Processing's constructor.
var processingInstance = new Processing(canvas, sketchProc);