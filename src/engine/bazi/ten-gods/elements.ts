import { Stem } from "../../shared/types";

export type Element = "Wood" | "Fire" | "Earth" | "Metal" | "Water";
export type Polarity = "yang" | "yin";

export const STEM_ELEMENT: Record<Stem, Element> = {
  甲: "Wood", 乙: "Wood",
  丙: "Fire", 丁: "Fire",
  戊: "Earth", 己: "Earth",
  庚: "Metal", 辛: "Metal",
  壬: "Water", 癸: "Water",
};

export const STEM_POLARITY: Record<Stem, Polarity> = {
  甲: "yang", 乙: "yin",
  丙: "yang", 丁: "yin",
  戊: "yang", 己: "yin",
  庚: "yang", 辛: "yin",
  壬: "yang", 癸: "yin",
};

export const GENERATES: Record<Element, Element> = {
  Wood: "Fire",
  Fire: "Earth",
  Earth: "Metal",
  Metal: "Water",
  Water: "Wood",
};

export const CONTROLS: Record<Element, Element> = {
  Wood: "Earth",
  Earth: "Water",
  Water: "Fire",
  Fire: "Metal",
  Metal: "Wood",
};
