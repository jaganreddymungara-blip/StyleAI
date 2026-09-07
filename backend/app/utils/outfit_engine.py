def calculate_score(shirt, pant, shoe):
    score = 0
    reasons = []

    shirt_color = shirt["color"].lower()
    pant_color = pant["color"].lower()
    shoe_color = shoe["color"].lower()

    # White shirt matches almost everything
    if shirt_color == "white":
        score += 30
        reasons.append("White shirt is highly versatile.")

    # Black pants match almost everything
    if pant_color == "black":
        score += 25
        reasons.append("Black pants match most outfits.")

    # White shoes are versatile
    if shoe_color == "white":
        score += 20
        reasons.append("White shoes complement many outfits.")

    # Same color shirt and pant isn't ideal
    if shirt_color == pant_color:
        score -= 15
        reasons.append("Shirt and pant are the same color.")

    # Neutral color bonus
    neutral = ["white", "black", "grey", "gray", "navy", "beige"]

    if shirt_color in neutral:
        score += 10

    if pant_color in neutral:
        score += 10

    if shoe_color in neutral:
        score += 10

    return score, reasons