import { authMiddleware } from "@/app/api/middleware/AuthMiddleware";
import Review from "@/app/api/models/Review/Review";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: Response) {
  const isAuthenticated = await authMiddleware(req);
  if (isAuthenticated) {
    try {
      const reqBody = await req.json();
      const { email } = reqBody;
      const ReviewExists = await Review.findOne({ email: email });
      if (ReviewExists) {
        await Review.findOneAndDelete({ email: email });
        return NextResponse.json({ success: true }, { status: 200 });
      } else {
        return NextResponse.json(
          { success: false, message: "Review doesn't exist" },
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
