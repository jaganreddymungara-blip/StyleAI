def get_profile_bonus(profile, shirt, pant, shoe):
    score = 0
    reasons = []

    skin_tone = profile.get("skin_tone", "").lower()
    season = profile.get("color_season", "").lower()
    body_shape = profile.get("body_shape", "").lower()

    colors = [
        shirt["color"].lower(),
        pant["color"].lower(),
        shoe["color"].lower()
    ]

    # ---------- Color Season ----------

    if season == "autumn":
        good = ["brown", "olive", "beige", "cream", "mustard", "green"]
        for color in colors:
            if color in good:
                score += 10
                reasons.append(f"{color.title()} suits Autumn color season.")

    elif season == "spring":
        good = ["white", "peach", "coral", "light blue", "yellow"]
        for color in colors:
            if color in good:
                score += 10
                reasons.append(f"{color.title()} suits Spring color season.")

    elif season == "summer":
        good = ["grey", "blue", "lavender", "pink", "white"]
        for color in colors:
            if color in good:
                score += 10
                reasons.append(f"{color.title()} suits Summer color season.")

    elif season == "winter":
        good = ["black", "white", "navy", "red"]
        for color in colors:
            if color in good:
                score += 10
                reasons.append(f"{color.title()} suits Winter color season.")

    # ---------- Skin Tone ----------

    if skin_tone == "light":
        if "black" in colors:
            score += 5
            reasons.append("Black contrasts nicely with light skin.")

    elif skin_tone == "medium":
        if "white" in colors:
            score += 5
            reasons.append("White complements medium skin tone.")

    elif skin_tone == "dark":
        if "cream" in colors or "yellow" in colors:
            score += 5
            reasons.append("Warm colors complement dark skin tone.")

    # ---------- Body Shape ----------

    if body_shape == "rectangle":
        score += 5
        reasons.append("Balanced outfit suits a rectangle body shape.")

    elif body_shape == "triangle":
        score += 5
        reasons.append("This outfit balances a triangle body shape.")

    elif body_shape == "oval":
        score += 5
        reasons.append("Simple outfit flatters an oval body shape.")

    return score, reasons