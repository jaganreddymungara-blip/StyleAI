def recommend_outfits(profile, wardrobe):

    shirts = [item for item in wardrobe if item["category"] == "Shirt"]
    pants = [item for item in wardrobe if item["category"] == "Pant"]
    shoes = [item for item in wardrobe if item["category"] == "Shoe"]

    recommendations = []

    for shirt in shirts:
        for pant in pants:

            outfit = {
                "shirt": shirt["name"],
                "pant": pant["name"],
                "reason": "Recommended based on wardrobe matching."
            }

            if shoes:
                outfit["shoe"] = shoes[0]["name"]

            recommendations.append(outfit)

    return recommendations