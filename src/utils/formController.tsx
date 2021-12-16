import React from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {FormLabel, Input} from "@chakra-ui/react";

type Inputs = {
    example: string;
    exampleRequired: string;
};

export default function ValidForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        alert(JSON.stringify(data));
    }; // your form submit function which will invoke after successful validation

    console.log(watch("example")); // you can watch individual input by pass the name of the input

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel>Example</FormLabel>
            <Input {...register("example")} defaultValue="test"/>
            <FormLabel>ExampleRequired</FormLabel>
            <Input
                {...register("exampleRequired", {required: true, maxLength: 10})}
            />
            {errors.exampleRequired && <p>This field is required</p>}
            <Input type="submit"/>
        </form>
    );
}