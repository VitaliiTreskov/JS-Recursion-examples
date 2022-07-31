//https://www.udemy.com/course/javascript_full/learn/lecture/30884698#questions/13174006


//example 1
//raising a number to a power
function pow(x, n) {
    //if power is equal to 1, return x (i.e. 2^1 = 0)
    if(n === 1) {
        return x;
    } else {
        //this is recursion, when the function is called inside itself
        return x * pow(x, n - 1);
    } 
}

console.log(pow(2, 5));


//example 2
//factorialize a number

function factorial(num) {
    if(typeof(num) != 'number' || !Number.isInteger(num)) {
        return 'Input is not an integer number';
    }

    if (num <= 0) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
    
}

console.log(factorial(5));


//example 3
//Task is to calculate average progress of all students


let students = {
    js: [{
        name: 'John',
        progress: 100
    }, {
        name: 'Ivan',
        progress: 60
    
    }],

    html: {
        basic: [{
            name: 'Peter',
            progress: 20
        }, {
            name: 'Ann',
            progress: 18
        }],

        pro: [{
            name: 'Sam',
            progress: 10
        }]
    }
};

//1st approach by using iteration

//1. Object.values(students) will return an array of all values of students object's properties
// (i.e [[{name: 'John', progress: 100}, { name: 'Ivan', progress: 60 }]])

//2. for... of loop will iterate through the array. Array is containing other arrays and objects
//using Array.isArray(course) allows to identify elements, that are arrays, so they have length property

//3. we can access students' progress refering to course[i].progress as it is a value of object property

//4. In the else block we evaluate the part of students made from objects. We use Object.values(course) to obtain
//an array of values.

//5. At the end we will have sum of total progress and total number of students,
// so it is easy to return average progress

//The issue with this approach is that if structure of students object will be changed, code should be refactored,
//using addition if () statements that complecates the code

function getTotalProgressByIteration(data){
    let total = 0;
    let students = 0;

    for(let course of Object.values(data)) {
        if(Array.isArray(course)) {
            students += course.length;

            for(let i = 0; i < course.length; i++) {
                total += course[i].progress;
            }
        } else {
            for(let subCourse of Object.values(course)) {
                students += subCourse.length;

                for(let i = 0; i < subCourse.length; i++) {
                    total += subCourse[i].progress;
                }
            }
        }
    }

    return total / students;
}

console.log(getTotalProgressByIteration(students));


//2nd approach by using recursion.

//1. Basic case of the recursion will be check for an array.
//if data is an array, then total progress is calculated in the loop
//since we have to calculate average progress, we return an array that contains total progress and number of students,
//which is length of array

//2. if data is not an array (but is an object), code goes to else part
//we declare an array with 2 values
//we are interested in the values of object's properties, so we use Object.values(data) and obtain an array of values 
//we use the for-of loop to look through array of values
//subData type could be arrays and objects, that's why we call again function getTotalProgressByRecursion(subData)
//then internal function will look through data type, if it is an array it will go by if statement,
//if - an object it will go by else part
//at the end we will receive an total which is an array of total progress and total number of students
//then we can divide one part of an array with the second part to get average progress

function getTotalProgressByRecursion(data) {
    if(Array.isArray(data)) {
        let total = 0;

        for (let i = 0; i < data.length; i++) {
            total += data[i].progress;
        }

        return [total, data.length];
    } else {
        let total = [0, 0];

        for(let subData of Object.values(data)) {
            const subDataArr = getTotalProgressByRecursion(subData);
            total[0] += subDataArr[0];
            total[1] += subDataArr[1];
        }
        return total;
    }
}

const result = getTotalProgressByRecursion(students);
console.log(result[0] / result[1]);

