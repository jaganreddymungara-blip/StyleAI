def get_style_bonus(shirt, pant, shoe):
    score = 0
    reasons = []

    shirt_style = shirt.get("style", "").lower()
    pant_style = pant.get("style", "").lower()
    shoe_style = shoe.get("style", "").lower()

    styles = [shirt_style, pant_style, shoe_style]

    if len(set(styles)) == 1:
        score += 25
        reasons.append("All clothing items follow a consistent style.")

    elif shirt_style == "formal" and pant_style == "formal":
        score += 15
        reasons.append("Formal shirt pairs well with formal pants.")

    elif shirt_style == "smart-casual" and pant_style == "smart-casual":
        score += 15
        reasons.append("Smart-casual pieces work well together.")

    elif shirt_style == "casual" and pant_style == "casual":
        score += 15
        reasons.append("Casual outfit feels balanced.")

    elif shirt_style == "formal" and pant_style == "smart-casual":
        score += 5
        reasons.append(
            "Formal shirt and smart-casual pants create a business-casual look."
        )

    else:
        score -= 10
        reasons.append("Clothing styles are not fully consistent.")

    return score, reasons