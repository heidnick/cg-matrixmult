class Matrix {
    constructor(r, c) {
        this.rows = r;
        this.columns = c;
        this.data = [];
        var i, j;
        for (i = 0; i < this.rows; i++) {
            this.data.push([]);
            for (j = 0; j < this.columns; j++) {
                this.data[i].push(0);
            }
        }
    }

    set values(v) {
        var i, j, idx;
        // v is already a 2d array with dims equal to rows and columns
        if (v instanceof Array && v.length === this.rows &&
            v[0] instanceof Array && v[0].length === this.columns) {
            this.data = v;
        }
        // not valid
        else {
            console.log("could not set values for " + this.rows + "x" + this.columns + " maxtrix");
        }
    }

    get values() {
        return this.data.slice();
    }

    // matrix multiplication (this * rhs)
    mult(rhs) {

        var result = null;
        var tempArray = null;
        var adding = 0;
        var matrix = new Matrix(this.rows, rhs.columns);
        // ensure multiplication is valid
        if (rhs instanceof Matrix && this.columns === rhs.rows) {
            // implement matrix multiplication here!
            result = new Array();
            for (var rIndex = 0; rIndex < this.rows; rIndex ++) {
				tempArray = new Array();
				for (var rColIndex = 0; rColIndex < rhs.columns; rColIndex++) {
					for (var i = 0; i < this.columns; i++) {
						adding = adding + (rhs.data[i][rColIndex]*this.data[rIndex][i])
					} //innermost
					tempArray.push(adding);
					adding = 0;
				} //inner
				result.push(tempArray);
			} //outer


			this.data = result;
			this.columns = rhs.columns;
            return this;

        }
        else {
            console.log("could not multiply - row/column mismatch");
        }
        return result;
    }
}

Matrix.multiply = function(...args) {
    var i;
    var result = null;
    // ensure at least 2 matrices
    if (args.length >= 2 && args.every((item) => {return item instanceof Matrix;})) {
        result = args[0];
        i = 1;
        while (result !== null && i < args.length) {
            result = result.mult(args[i]);
            i++;
        }
    }
    else {
        console.log("could not multiply - requires at least 2 matrices");
    }
    return result;
}