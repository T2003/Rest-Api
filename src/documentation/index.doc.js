const { Router } = require('express');
const { serve, setup } = require('swagger-ui-express');

const docrouter = Router();

const local = process.env.LOCAL_HOST;
const heroku = process.env.DB_CONNECT;


const options = {
  openapi: '3.0.1',
  info: {
    title: 'My Brand',
    version: '1.0.0',
    description:
      'This is the backend api for my portfolio app.',
  },
  host: process.env === 'production' ? heroku : local,
  basePath: '/api',
security: [
  {
    bearerAuth: [],
  }
],
tags: [
      {name: 'Users', description: 'Users'},
      {name: 'Blog', description: 'Blogs'},
      {name: 'Message', description: 'Messages'},
    ],
  paths: {
    '/api/users/register': {
      post: {
        tags: ['Users'],
        description: 'User register',
        security: [],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                username: 'Daniel TUYIZERE',
                email: 'tuyizere925@gmail.com',
                password: 'daniel@2022',
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: 'New User was created successfully',
          },
          400: {
            description: 'Bad Request',
          },
          500: {
              description: 'Internal Server Error'
          }
        },
      },
    },
    '/api/users/login': {
        post: {
        tags: ['Users'],
        description: 'User login',
        security: [],
        parameters: [],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User',
              },
              example: {
                email: 'tuyizere925@gmail.com',
                password: 'daniel@2022',
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: 'successfully',
          },
          400: {
            description: 'Invalid credation',
          },
          500: {
              description: 'Internal Server Error'
          }
        }, 
        } 
    },
    '/api/articles/': {
        get: {
        tags: ['Blog'],
        description: 'Get All Blog Articles',
        parameters: [],
        security: [],
        responses: {
          200: {
            description: 'successfully',
          },
          500: {
              description: 'Internal Server Error'
          }
        }, 
      } 
    },
    '/api/articles/{id}': {
      get: {
        security: [],
      tags: ['Blog'],
      description: 'Get One Blog article by id',
      parameters: [
        {
           "in": "path",
         "name": "id",
          required: true,
        }
      ],
      responses: {
        200: {
          description: 'successfully',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
      } 
  },
  '/api/articles/add':{
    post:{
      tags:['Blog'],
      description:'Create new blog article',
      parameters:[

      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
            example: {
              title: 'testing blog article title',
              content: 'testing blog article content',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/articles/update/{id}':{
    patch:{
      tags:['Blog'],
      description:'Update blog article',
      parameters: [
        {
           "in": "path",
         "name": "id",
          required: true,
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
            example: {
              title: 'testing blog article title update',
              content: 'testing blog article content update',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        404: {
          description: 'Article doesn\'t exist!',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/articles/delete/{id}':{
    delete:{
      tags:['Blog'],
      description:'Delete blog article',
      parameters: [
        {
           "in": "path",
         "name": "id",
          required: true,
        }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'User Not Authorized',
        },
        404: {
          description: 'Article doesn\'t exist!',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/articles/comment/{id}':{
    post:{
      tags:['Blog'],
      description:'Comment on article blog article',
      parameters: [
        {
          "in": "path",
        "name": "id",
         required: true,
       }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
            example: {
              
              comment:"that content is very helpful thanks"
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'Not Authorized',
        },
        404: {
          description: 'Article doesn\'t exist!',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/articles/like/{id}':{
    post:{
      tags:['Blog'],
      description:'Like on article blog article',
      parameters: [
        {
          "in": "path",
        "name": "id",
         required: true,
       }
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Blog',
            },
           
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'Not Authorized',
        },
        404: {
          description: 'Article doesn\'t exist!',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/message/send/':{
    post:{
      tags:['Message'],
      security:[],
      description:'Sending message',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Message',
            },
            example: {
              name:"Daniel TUYIZERE",
              email:"tuyizere925@gmail.com",
              message:"testing message"
            },
          },
        },
        required: true,
      },
      responses: {
        200: {
          description: 'successfully',
        },
        500: {
            description: 'Internal Server Error'
        }
      }, 
    }
  },
  '/api/message/':{
    get:{
      tags:['Message'],
      description:'Getting all messages',
      parameters: [],
      responses: {
        200: {
          description: 'successfully',
        },
        401: {
          description: 'Not Authorized',
        },
        500: {
            description: 'Internal Server Error'
      },
    }, 
    }
  },
  },
  components: {
    schemas: {
      User: {
        type: 'object',

        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the user',
          },
          username: {
            type: 'string',
            description: "User's names",
          },
          password: {
            type: 'string',
            description: "User's password",
          },
          email: {
            type: 'string',
            description: "User's email",
          },
          role: {
            type: 'string',
            description: "User role",
          },
        },
      },
      Blog: {
        type: 'object',

        properties: {
          id: {
            type: 'string',
            description: 'The auto-generated id of the user',
          },
          title: {
            type: 'string',
            description: "Article title",
          },
          content: {
            type: 'string',
            description: "Article content",
          },
          imageUrl: {
            type: 'string',
            description: "Article image url",
          },
          postedDate: {
            type: 'string',
            description: "Article posted date ",
          },
          comments: {
            type: 'object',
            description: "Article Comments",
          },
          likes: {
            type: 'object',
            description: "Article likes",
          },
      },
    },
      Message: {
        type:"object",
        
        properties:{
          id: {
            type: 'string',
            description: 'The auto-generated id of the message',
          },
          name: {
            type: 'string',
            description: 'sender name',
          },
          email: {
            type: 'string',
            description: 'sender email',
          },
          message: {
            type: 'string',
            description: 'message content',
          },
        }
      }
     },
  
    securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
},
}

docrouter.use('/', serve, setup(options));

module.exports = docrouter;