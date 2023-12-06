import User from "@/app/api/models/User/User";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const secret = "aniket";

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    console.log("Logingi request body " , reqBody);
    
    const {formData} = reqBody;
    const name = formData.name
    const email = formData.email;
    const password = formData.password;
    const phone = formData.phoneNumber;

    console.log(name , email, phone,password);
    

    const isUser = await User.findOne({ email });
    if (isUser) {
      return NextResponse.json(
        { message: "User already exits" },
        { status: 400 }
      );
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      phone,
      password:secPass,
    });
    const authtoken = jwt.sign({ id: user.id }, secret);
    if (!user) {
      return NextResponse.json({
        message: "Error creating user",
        success: false,
      });
    }
    return NextResponse.json(
      { message: "success", user, authtoken },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        {
          status: 500,
        }
      );
    }
  }
};
