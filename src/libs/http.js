class Http {
  static instance = new Http();

  get = async url => {
    try {
      let request = await fetch(url);
      let json = await request.json();
      return json;
    } catch (error) {
      console.log('HTTP GET ERROR\n', error, '\n\n');
      throw Error(error);
    }
  };

  post = async (url, body) => {
    try {
      let req = await fetch(url, {
        method: 'POST',
        body,
      });
      let json = await req.json();
      return json;
    } catch (error) {
      console.log('HTTP POST ERROR\n', error, '\n\n');
      throw Error(error);
    }
  };

  delete = async url => {
    try {
      const request = await fetch(url, {
        method: 'DELETE',
      });
      const json = await request.json();
      return json;
    } catch (err) {
      console.log('HTTP DELETE ERROR\n', error, '\n\n');
      throw Error(err);
    }
  };

  put = async (url, body) => {
    try {
      const request = await fetch(url, {
        method: 'PUT',
        body,
      });
      const json = await request.json();
      return json;
    } catch (err) {
      console.log('HTTP PUT ERROR\n', error, '\n\n');
      throw Error(err);
    }
  };
}

export default Http;