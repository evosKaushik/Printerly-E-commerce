import { Product } from "../models/Product.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/dataUri.js";

const addProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      condition,
      discountPrice,
      category,
      brand,
      stock,
    } = req.body;

    const userId = req.user._id;

    // Validate required fields
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !category ||
      !condition ||
      !brand ||
      !stock
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate uploaded files
    if (!req.files || !req.files.thumbnail || !req.files.gallery) {
      return res.status(400).json({
        success: false,
        message: "Thumbnail and minimum 3 gallery images are required",
      });
    }

    // Gallery images must be at least 3 files
    if (req.files.gallery.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Upload at least 3 images",
      });
    }

    // Upload Thumbnail (single)
    const thumbFile = req.files.thumbnail[0];
    const thumbUri = getDataUri(thumbFile);

    const uploadedThumbnail = await cloudinary.uploader.upload(thumbUri, {
      folder: "printerly_thumbnails",
      width: 300,
      height: 300,
      crop: "fill",
    });

    const thumbnail = {
      url: uploadedThumbnail.secure_url,
      public_id: uploadedThumbnail.public_id,
    };

    // Upload Gallery Images (multiple)
    let productImg = [];

    for (let file of req.files.gallery) {
      const fileUri = getDataUri(file);

      const result = await cloudinary.uploader.upload(fileUri, {
        folder: "printerly_products",
      });

      productImg.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    // Validate discount
    if (discountPrice && discountPrice > productPrice) {
      return res.status(400).json({
        success: false,
        message: "Discount price must be less than actual price",
      });
    }

    // Save product
    const newProduct = await Product.create({
      userId,
      productName,
      productDescription,
      productPrice,
      category,
      brand,
      stock,
      condition,
      discountPrice,
      thumbnail,
      productImg,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "userId",
      "firstName username"
    );
    if (!products) {
      return res.status(404).json({
        success: false,
        message: "No product available",
        products: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not Found",
      });
    }

    //Delete images form cloudinary
    if (product.productImg && product.productImg.length > 0) {
      for (let img of product.productImg) {
        const result = await cloudinary.uploader.destroy(img.public_id);
      }
    }

    //Delete product from MongoDB
    await Product.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const {
      productName,
      productDescription,
      productPrice,
      category,
      brand,
      stock,
      existingImages,
    } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not Found",
      });
    }

    let updatedImages = [];

    //keep selected old Images

    if (existingImages) {
      const keepIds = JSON.parse(existingImages);
      updatedImages = product.productImg.filter((img) =>
        keepIds.includes(img.public_id)
      );

      const removedImages = product.productImg.filter(
        (img) => !keepIds.includes(img.public_id)
      );

      for (let img of removedImages) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    } else {
      updatedImages = product.productImg;
    }

    //updated new images
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const fileUri = getDataUri(file);
        const result = await cloudinary.uploader.upload(fileUri, {
          folder: "printerly_products",
        });
        updatedImages.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    product.productName = productName || product.productName;
    product.productDescription =
      productDescription || product.productDescription;
    product.productPrice = productPrice || product.productPrice;
    product.category = category || product.category;
    product.brand = brand || product.brand;
    product.stock = stock || product.stock;
    product.productImg = updatedImages;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { addProduct, getAllProduct, deleteProduct, updateProduct };
