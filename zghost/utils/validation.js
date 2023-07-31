import { body } from '../app/init.js'

class Validator{
    validatePlainText = (strName) => {
        return body(strName)
            .trim()
            .notEmpty()
            .withMessage(`${strName} Cannot be empty`)
            .escape()
    }
    validateDate = (strName) => {
        return body(strName)
            .notEmpty()
            .isISO8601()
            .withMessage('Invalid date')
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
