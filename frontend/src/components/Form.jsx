import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Form = ({
  formTitle,
  formDescription,
  children,
  onSubmit,
  submitText = "Submit",
  secondaryAction,
  footerText,
  footerLink,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="w-11/12 max-w-md font-inter shadow-lg border rounded-xl"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{formTitle}</CardTitle>
          {formDescription && (
            <CardDescription>{formDescription}</CardDescription>
          )}
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4 2xl:gap-6">{children}</div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          {/* Main submit button */}
          <Button
            type="submit"
            variant="primary"
            className="w-full text-white font-semibold text-[16px]  dark:bg-(--secondary-clr)/50"
          >
            {submitText}
          </Button>

          {secondaryAction && (
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
              onClick={secondaryAction.onClick}
            >
              {secondaryAction.text}
            </Button>
          )}

          {footerLink && (
            <p className="text-[16px] mt-2">
              {footerText}{" "}
              <Link
                to={footerLink.to}
                className="text-primary font-bold hover:underline"
              >
                {footerLink.text}
              </Link>
            </p>
          )}
        </CardFooter>
      </Card>
    </form>
  );
};

export default Form;
