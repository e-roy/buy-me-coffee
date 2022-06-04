import { CoffeeCup } from "@/images/CoffeeCup";

export const ThankYou = () => {
  return (
    <div className="m-auto mt-16 p-4">
      <div className="flex justify-center text-coffee-900 py-8">
        <CoffeeCup size="128px" />
      </div>
      <div className="text-4xl font-bold text-center text-coffee-900">
        thank you
      </div>
      <div></div>
    </div>
  );
};
