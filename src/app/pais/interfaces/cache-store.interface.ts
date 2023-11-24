import { Country } from "./pais.interface";
import { Region } from "./region.type";

export interface CacheStore{
    byCapital: TermCountries;
    byCountrie: TermCountries;
    byRegion: RegionCountries
}

export interface TermCountries {
    term: string;
    countries: Country[];
}

export interface RegionCountries {
    region ?: Region;
    countries: Country[];
}