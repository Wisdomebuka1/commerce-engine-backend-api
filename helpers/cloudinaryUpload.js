const {cloudinary} = require('../config/cloudinaryHelpers')

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath)

        return {
            url: result.secure_url,
            public_id: result.public_id
        }

    } catch (error) {
        console.error("Cloudinary Upload Error:", error)

        const customError = new Error('Error while uploading to cloudinary')

        // preserve original stack trace
        customError.stack = error.stack

        throw customError
    }
}


module.exports = {uploadToCloudinary}