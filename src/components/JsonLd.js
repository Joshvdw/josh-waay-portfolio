import {meta} from "@/data/personalData";

export function JsonLd() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: meta.title,
        description: meta.description,
        url: meta.domain,
        image: `${meta.domain}/openGraphPreview.webp`,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
