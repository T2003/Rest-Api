const cloudinary=require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'duaym10fi', 
    api_key: '137329397428676', 
    api_secret: '1EHbOJRXuIVO4sb6P67H-YqmsII' 
  });


module.exports = cloudinary.uploader;
