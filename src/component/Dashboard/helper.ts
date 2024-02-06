"use server";

import { sleep } from "@/utils/util";
import { revalidatePath } from "next/cache";
import { RedirectType, redirect, permanentRedirect } from "next/navigation";

export async function updateUser(prevState: any, formData: FormData) {
    const rawData = Object.fromEntries(formData.entries());
    console.log("rawData", rawData);

    try {
        //handle call api

        await sleep(1000);
        revalidatePath('/');
        // return { message: `Added user ${rawData.name}` }
    } catch (error) {
        return {
            message: 'Failed to create user',
        }
    }

    permanentRedirect("/home", RedirectType.replace);
}