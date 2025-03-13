import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import { User } from "../../types";
import { z } from "zod";
import LoadingSpinner from "../../components/loading";
import { useState } from "react";

export const Route = createFileRoute("/users/")({
  component: RouteComponent,
  validateSearch: z.object({
    city: z.string().optional(),
    name: z.string().optional(),
    id: z.number().optional(),
  }),
});

function RouteComponent() {
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate({ from: "/users/" });
  const searchParams = useSearch({ from: "/users/" });
  const { data, isSuccess, error, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  async function getUsers(): Promise<User[]> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const usersJson = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await usersJson.json();
    return users;
  }
  const handleCityChange = (city: string) => {
    navigate({
      search: (old) => ({ ...old, city }),
    });
  };

  const handleIdChange = (id: number) => {
    navigate({
      search: (old) => ({ ...old, id }),
    });
  };

  const handleClearCityParams = () =>
    navigate({ search: (old) => ({ ...old, city: undefined }) });

  const handleClearIdParams = () =>
    navigate({ search: (old) => ({ ...old, id: undefined }) });

  const handleAddParam = ({
    param,
    value,
  }: {
    param: "id" | "city" | "name";
    value: string;
  }) => {
    navigate({
      search: (old) => ({ ...old, [param]: value }),
    });
  };

  const handleClearAllParams = () => {
    setName("");
    setCity("");
    navigate({ search: () => ({}) });
  };
  return (
    <div className="flex flex-col gap-12 items-center justify-center">
      {isPending && <LoadingSpinner />}
      {error && <h2>{error.message}</h2>}
      {isSuccess && (
        <>
          <h1>Users</h1>
          <ol>
            {data
              .filter((user) => {
                if (!searchParams.city) return true;
                return user.address.city
                  .toLowerCase()
                  .includes(searchParams.city.toLowerCase());
              })
              .filter((user) => {
                if (!searchParams.id) return true;
                return user.id === searchParams.id;
              })
              .filter((user) => {
                if (!searchParams.name) return true;
                return user.name
                  .toLowerCase()
                  .includes(searchParams.name.toLowerCase());
              })
              .map((user) => (
                <li key={user.id}>
                  {user.id}. <b>{user.name}</b> - {user.address.city}
                </li>
              ))}
          </ol>
          <div className="space-y-8">
            <div className="space-y-8">
              <h2>Add params</h2>
              <button onClick={handleClearAllParams}>Clear all params</button>
              <div className="space-x-4 ">
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={city}
                  placeholder="New York, Barcelona ..."
                  onChange={(e) => setCity(e.target.value)}
                />
                <button
                  onClick={() => handleAddParam({ param: "city", value: city })}
                >
                  Filter by city
                </button>
              </div>
              <div className="space-x-4 ">
                <input
                  type="text"
                  name="name"
                  id="city"
                  value={name}
                  placeholder="John, Jane ..."
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  onClick={() => handleAddParam({ param: "name", value: name })}
                >
                  Filter by name
                </button>
              </div>
              <div className="flex gap-4">
                <button onClick={handleClearCityParams}>
                  Clear city params
                </button>
                <button onClick={() => handleCityChange("Howemouth")}>
                  From Howemouth
                </button>
                <div className="flex gap-4">
                  <button onClick={handleClearIdParams}>Clear ID params</button>
                  <button onClick={() => handleIdChange(1)}>ID = 1</button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2>Search params: </h2>
              <ol>
                <li>
                  <b>ID: </b>
                  {searchParams.id || "no ID param"}
                </li>
                <li>
                  <b>CITY: </b> {searchParams.city || "no CITY param"}
                </li>
                <li></li>
              </ol>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
