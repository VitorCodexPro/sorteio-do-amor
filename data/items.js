const ITEMS = {
  vitor: [
    { id: "v01", name: "Teclado e mouse sem fio branco",              url: "https://br.shp.ee/4T7C81wZ" },
    { id: "v02", name: "Camisa Polo com Ziper",                       url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbLGhGC0b3_8&localcountry=BR" },
    { id: "v03", name: "Camiseta Basica Essencial Manga Curta",       url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbYPPIwn9r_8&localcountry=BR" },
    { id: "v04", name: "Camisa Polo Malha Canelada Listrada",         url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbVsbKdlN6_8&localcountry=BR" },
    { id: "v05", name: "Camiseta Malha Waffle Ajuste Muscular",       url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbV0RrnfvN_8&localcountry=BR" },
    { id: "v06", name: "Sueter Gola Careca Casual de Inverno",        url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbRJwUhwjP_8&localcountry=BR" },
    { id: "v07", name: "Sueter Manga Curta Gola Alta Classico",       url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbqPptVK8P_8&localcountry=BR" },
    { id: "v08", name: "Sueter Gola Careca Tricotado Manga Longa",    url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbqouR3HGB_8&localcountry=BR" },
    { id: "v09", name: "Calca de Moletom Perna Larga",                url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbI0AQAOkI_8&localcountry=BR" },
    { id: "v10", name: "Meias Esportivas Confortaveis Unissex",       url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAn7SDzr0zc_8&localcountry=BR" },
    { id: "v11", name: "Regata Masculina Premium Americana Canelada", url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAnuPL9mxE3_8&localcountry=BR" },
    { id: "v12", name: "Regata Masculina Casual Basica Algodao",      url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAnuzGnqBmV_8&localcountry=BR" },
    { id: "v13", name: "Sueter Grunge Punk Jacquard Desgastado",      url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAn8jJEPXWF_8&localcountry=BR" },
    { id: "v14", name: "Colete Cropped Solto Estampa Gotica",         url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAncvCFZjZ1_8&localcountry=BR" },
    { id: "v15", name: "Sueter Oversized Malha Canelada Manga Curta", url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAneInwHoBT_8&localcountry=BR" },
  ],
  maria: [
    { id: "m01", name: "Acido Creamy (rosa)",                         url: "https://vt.tiktok.com/ZS98qkxedxFyw-D788t/" },
    { id: "m02", name: "Conjunto de academia",                        url: "https://vt.tiktok.com/ZS98qBNX3onVt-M5mUs/" },
    { id: "m03", name: "Blusa assimetrica com babado gola alta",      url: "https://vt.tiktok.com/ZS98qB6LfAcks-NJU5x/" },
    { id: "m04", name: "Sabonete liquido facial Creamy",              url: "https://vt.tiktok.com/ZS98qk4M51YVT-zQp7O/" },
    { id: "m05", name: "Look Shein 1",                                url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAUK3WOlqck_8&localcountry=BR" },
    { id: "m06", name: "Look Shein 2",                                url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAU0t5Xgbhh_8&localcountry=BR" },
    { id: "m07", name: "Conjunto Shein",                              url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAUycx531bg_8&localcountry=BR" },
    { id: "m08", name: "Camisa",                                      url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbLSqpiKdy_8&localcountry=BR" },
    { id: "m09", name: "Camisa branca",                               url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbLBQ0BUqB_8&localcountry=BR" },
    { id: "m10", name: "Sapato",                                      url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbVdTZKhey_8&localcountry=BR" },
    { id: "m11", name: "Sutia",                                       url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbVQYliaFR_8&localcountry=BR" },
    { id: "m12", name: "Saia longa",                                  url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAblZU5qXci_8&localcountry=BR" },
    { id: "m13", name: "Camisa preta",                                url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbR6WbuApH_8&localcountry=BR" },
    { id: "m14", name: "Vestido mid",                                 url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbqEsbMwvB_8&localcountry=BR" },
    { id: "m15", name: "Salto marrom",                                url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbPXAr5nON_8&localcountry=BR" },
    { id: "m16", name: "Vestido marrom",                              url: "https://api-shein.shein.com/h5/sharejump/appjump?link=lAbP6jh1VgL_8&localcountry=BR" },
  ]
};

const PASSWORDS = {
  vitor: "1020",
  maria: "1508"
};