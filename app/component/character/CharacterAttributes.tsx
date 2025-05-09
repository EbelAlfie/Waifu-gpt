import { LongButton } from "@/app/common/LongButton";
import { CharacterDetailData, useCharacterContext } from "@/app/hooks/CharacterData";
import { RarityStar } from "./RarityStar";
import { CharacterStats } from "./Stats";
import { useContext, useMemo } from "react";

export const CharacterAttribute = ({ classname }: { classname?: string }) => {
  const character = useCharacterContext();
  const characterDetail = useContext(CharacterDetailData);
  
  const characterInfo = character.charInfo;

  const rarity = new Array(characterInfo.rarity).fill(() => <RarityStar />);

  const onDetailClicked = () => {};

  const transition = useMemo(
    () => (characterDetail.type === "loaded" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"), 
    [characterDetail.type]
  );

  return <>
      <section
        className={`flex flex-col w-fit mt-8 me-8 ${classname} ${transition} delay-75 duration-200 transition-all`}
      > { 
        characterDetail.type === "loaded" && <div>
          <RarityStar />
          <p className="text_genshin text-3xl mb-5">{characterInfo.name}</p>
          <div className="flex flex-row w-fit">{rarity}</div>
          <p className="text_genshin text-2xl mb-3">
            Level {characterInfo.level} / 90
          </p>
          <CharacterStats detail={characterDetail?.data}/>
          <LongButton
            classname="flex-grow mt-5"
            label="Details"
            onClick={onDetailClicked}
          />
        </div>
      }
      </section>     
    </>
};
