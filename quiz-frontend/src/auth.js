export const authenticate = (jwt, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(jwt));
        next();
    }
};

export const isAuthenticated = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};

export const addQuestionToTaken = id => {
    if (typeof window == 'undefined') {
        return false;
    }
    let quizzes = localStorage.getItem('quizzesTaken');
    if(quizzes) {
        let arr = JSON.parse(quizzes);
        arr.push(id);
        localStorage.setItem('quizzesTaken', JSON.stringify(arr));
    }
    else {
        let arr = [id];
        localStorage.setItem('quizzesTaken', JSON.stringify(arr));
    }
}

export const quizTaken = id => {
    if (typeof window == 'undefined') {
        return false;
    }
    let quizzes = localStorage.getItem('quizzesTaken');
    if(!quizzes) return false;
    let arr = JSON.parse(quizzes);
    if(arr.indexOf(id) === -1) return false;
    return true;
}