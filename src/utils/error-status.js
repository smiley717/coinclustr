export const errorStatus = ({response}, callbackOn400, onInternalServerError) => {
  const { status } = response;

  const is400 = status === 400;
  const is500 = status === 500;

  if(is400 && typeof callbackOn400 === 'function'){
    callbackOn400();
  }
  if(is500 && typeof onInternalServerError === 'function'){
    onInternalServerError();
  }

  return {
    is400,
    is500
  }
}

