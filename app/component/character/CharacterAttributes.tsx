import { LongButton } from "@/app/common/LongButton";
import { useCharacterContext } from "@/app/hooks/CharacterData";
import { RarityStar } from "./RarityStar";
import { CharacterStats } from "./Stats";
import { useMemo } from "react";

export const CharacterAttribute = ({ classname }: { classname?: string }) => {
  const character = useCharacterContext();
  const characterInfo = character.charInfo;
  const stats = character.charStats;
  const rarity = new Array(characterInfo.rarity).fill(() => <RarityStar />);

  const onDetailClicked = () => {};

  const transition = useMemo(() => (stats ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"), [stats]);

  return (
    <>
      <div
        className={`flex flex-col w-fit mt-8 me-8 ${classname} ${transition} delay-75 duration-200 transition-all`}
      >
        <RarityStar />
        <p className="text_genshin text-3xl mb-5">{characterInfo.name}</p>
        <div className="flex flex-row w-fit">{rarity}</div>
        <p className="text_genshin text-2xl mb-3">
          Level {characterInfo.level} / 90
        </p>
        <CharacterStats />
        <LongButton
          classname="flex-grow mt-5"
          label="Details"
          onClick={onDetailClicked}
        />
      </div>
    </>
  );
};
