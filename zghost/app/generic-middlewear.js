export const catchAndForwardErrors = (code) =>{
    (req, res, next) =>{
        next(createError(code));
      }
}