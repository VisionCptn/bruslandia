import { useId } from "react";
import { getRandomRotationClass } from "../utils/randomPosition";

type MenuItem = {
    label: string;
    href: string;
    isCurrent?: boolean;
};

type MenuSection = {
    title: string;
    items: MenuItem[];
};

type Props = {
    heading?: string;
    sections: MenuSection[];
    aboutLink: MenuItem;
    instagram: MenuItem;
};

/**
 * A string to be converted into a slug. 
 * It will be lowercased, trimmed, spaces will be replaced with hyphens, 
 * and non-alphanumeric characters (except hyphens) will be removed.
 * @param s  
 * @returns 
 */
function slug(s: string) {
    return s
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\p{L}\p{N}-]+/gu, "");
}

export const MainMenuContent = ({
    heading,
    sections,
    aboutLink,
    instagram,
  }: Props) => {
    const navLabelId = useId();

    return (
        <nav aria-labelledby={navLabelId} className="flex flex-col font-medium h-full">
            <h2 className={`block font-bold text-base pb-2 ${getRandomRotationClass()}`} id={navLabelId}>{heading}</h2>
            <div className={`pl-2`}>
                {sections.map((section) => {
                    const sectionId = `${navLabelId}-${slug(section.title)}`;

                    return (
                        <section className={`mb-6`} key={section.title} aria-labelledby={sectionId}>
                            <h3 className={`font-bold text-base pb-1 ${getRandomRotationClass()}`} id={sectionId}>{section.title}</h3>
                            <ul className="pl-5">
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        <a className={`hover:font-bold block max-w-max ${getRandomRotationClass()}`} href={item.href} aria-current={item.isCurrent ? "page" : undefined}>
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    );
                })}
            </div>

            <div className="mt-8">
                <a className="font-bold " href={aboutLink.href} aria-current={aboutLink.isCurrent ? "page" : undefined}>
                    {aboutLink.label}
                </a>
            </div>

            <div className="mt-auto">
                <a className="font-medium hover:font-bold" href={instagram.href}>
                    {instagram.label}
                </a>
            </div>
        </nav>
    )
}

//               _._     _,-'""`-._            /
//               (,-.`._,'(       |\`-/|       \
//                   `-.-' \ )-`( , o o)       |
//                         `-    \`_`"'-      /
//                                          *
