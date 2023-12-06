import { authMiddleware } from "@/app/api/middleware/AuthMiddleware";
import videoPotrait from "@/app/api/models/videoPotrait/videoPotrait";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: Response) {
  const isAuthenticated = await authMiddleware(req);
  if (isAuthenticated) {
    try {
      const reqBody = await req.json();
      const { image } = reqBody;
      const imageExists = await videoPotrait.findOne({ image: image });
      if (imageExists) {
        await videoPotrait.findOneAndDelete({ image: image });
        return NextResponse.json({ success: true }, { status: 200 });
      } else {
        return NextResponse.json(
          { success: false, message: "Image doesn't exist" },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { success: false, message: (error as Error).message },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json(
      { success: false, message: "You don't have access to this resource" },
      { status: 400 }
    );
  }
}