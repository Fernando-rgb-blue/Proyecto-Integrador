import { writeFile } from "fs/promises";
import path from "path";
import uniqid from 'uniqid';
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    const data = await req.formData();
    const file = data.get('file') as File | null;

    if (file) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const ext = file.name.split('.').slice(-1)[0];
        const newFileName = uniqid() + '.' + ext;
        const directory = "/images/uploads/" + newFileName;

        await writeFile(
            path.join(process.cwd(), 'public' + directory), buffer
        );

        //console.log(directory);

        return NextResponse.json({ path: directory });
    }

    return NextResponse.json({ success: false });
}