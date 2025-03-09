import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { HTMLAttributes } from "react";
import { z } from "zod";

const { fieldContext, useFieldContext, formContext } = createFormHookContexts();

const TextField = ({ label }: { label: string }) => {
  const field = useFieldContext<string>();
  const isError = field.state.meta.errors.length;
  return (
    <>
      <label htmlFor="text-field">{label}</label>
      <input
        style={{ border: isError ? "1px solid red" : "" }}
        value={field.state.value}
        onChange={(e) => field.setValue(e.target.value)}
        id="text-field"
        type="text"
      />
      {!isError && (
        <small style={{ opacity: 0, pointerEvents: "none" }}>placeholder</small>
      )}
      {isError ? (
        <small style={{ color: "red" }}>
          {field.state.meta.errors.map((e) => e.message).join(",")}
        </small>
      ) : null}
    </>
  );
};

const NumberField = ({ label }: { label: string }) => {
  const field = useFieldContext<number>();
  const isError = field.state.meta.errors.length;

  return (
    <>
      <label htmlFor="number-field">{label}</label>
      <input
        style={{ border: isError ? "1px solid red" : "" }}
        onChange={(e) => field.setValue(parseInt(e.target.value))}
        value={field.state.value}
        id="number-field"
        type="number"
      />
      {!isError && (
        <small style={{ opacity: 0, pointerEvents: "none" }}>placeholder</small>
      )}
      {isError ? (
        <small style={{ color: "red" }}>
          {field.state.meta.errors.map((e) => e.message).join(",")}
        </small>
      ) : null}
    </>
  );
};

const SubmitButton = (props: HTMLAttributes<HTMLButtonElement>) => {
  return <button {...props}></button>;
};

function App() {
  const { useAppForm } = createFormHook({
    fieldComponents: { TextField, NumberField },
    formComponents: { SubmitButton },
    fieldContext,
    formContext,
  });
  const form = useAppForm({
    defaultValues: {
      username: "",
      age: 0,
    },
    validators: {
      onChange: z.object({
        username: z.string().min(1, { message: "Please enter a username" }),
        age: z.number().min(13, { message: "Min age is 13" }),
      }),
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2));
    },
  });
  return (
    <main
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100dvh",
        display: "grid",
        placeContent: "center",
      }}
    >
      <article style={{ padding: 64, width: 550 }}>
        <h1 style={{ textAlign: "center" }}>Tanstack form</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <h4 style={{ textAlign: "center" }}>Personal Information</h4>
          <form.AppField
            name="username"
            children={(field) => <field.TextField label="Full Name" />}
          />
          <form.AppField
            name="age"
            children={(field) => <field.NumberField label="Age" />}
          />
          <form.AppForm>
            <form.SubmitButton>Submit</form.SubmitButton>
          </form.AppForm>
        </form>
      </article>
    </main>
  );
}

export default App;
