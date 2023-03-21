const validateBody = (validationSchema, objectToValidate) => {
  const parsedObject = validationSchema.safeParse(objectToValidate);
  let errorMessage;

  if (!parsedObject.success) {
    const errorObject = parsedObject.error.issues[0];
    errorMessage = `${errorObject.path[0]}[${errorObject.message}]`;
    throw new Error(errorMessage);
  }
}

module.exports = { validateBody };
