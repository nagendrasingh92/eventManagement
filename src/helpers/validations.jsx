import * as Yup from "yup";

export const createEventSchema = Yup.object({
    eventName: Yup.string().min(2).max(25).required("Please enter Event Name"),
}) 