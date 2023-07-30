import { body } from '../app/init.js'

class Validator{
    validateDate = (strName) => {
        return body(strName)
            .optional({ values: 'falsy' })
            .isISO8601()
            .withMessage('Invalid date')
    }
    
    validatePassword = (password) =>{
        return body(password)
            .trim()
            .notEmpty()
            .isLength({ min: 8, max: 24})
            .escape()
            
    }

    validateUsername = (username) =>{
        return body(username)
            .trim()
            .notEmpty()
            .isLength({ min: 2, max: 100 })
            .escape()
    }

    validatePlainText = (strName) => {
        return body(strName)
            .trim()
            .notEmpty()
            .withMessage(`${strName} Cannot be empty`)
            .escape()
    }
    
    validateISBN = (strName) =>{
        return body(strName)
            .trim()
            .notEmpty()
            .withMessage('ISBN is required')
            .isLength({ min: 13, max: 13})
            .withMessage('ISBN must strictly be a 13 digit number')
            .isInt()
            .withMessage('ISBN must be a valid integer')
            
    }

}

export const validator = new Validator()
