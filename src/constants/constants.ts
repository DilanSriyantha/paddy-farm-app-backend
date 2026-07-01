export interface Stage {
    id: string;
    title: string;
    description: string;
};

export interface Notification {
    id: string;
    title: string;
    message: string;
};

export interface Recommendation {
    watering_recommendation: string;
    fertilizer_recommendation: string;
    disease_and_pest_check: string;
    maintenance_tips: string;
    next_stage_prediction: string;
};

export interface RecommendationSummary {
    stage: Stage;
    recommendation: Recommendation | null;
    daysGone: number;
};

type CropStage =
    | 'germination'
    | 'seedling_early_vegetative'
    | 'tillering'
    | 'panicle_initiation'
    | 'booting_heading'
    | 'flowering'
    | 'grain_filling_ripening'
    | 'harvest';

interface Recommendations {
    stages: Record<CropStage, Recommendation>;
};

interface Notifications {
    stages: Record<CropStage, Notification>;
};

type Stages = Record<CropStage, Stage>;

type LanguageOption =
    | 'en'
    | 'si';

interface TextContent {
    stages: Stages,
    notifications: Notifications;
    recommendations: Recommendations
};

type TextContents = Record<LanguageOption, TextContent>;

export const TextContents: TextContents = {
    en: {
        stages: {
            germination: {
                id: "stg-01",
                title: "Germination",
                description: "Seed germination and early seedling growth",
            },
            seedling_early_vegetative: {
                id: "stg-02",
                title: "Seedling/Early Vegetative",
                description: "Root and leaf development begins",
            },
            tillering: {
                id: "stg-03",
                title: "Tillering",
                description: "Multiple tillers (shoots) develop",
            },
            panicle_initiation: {
                id: "stg-04",
                title: "Panicle Initiation",
                description: "Flower structures begin forming inside the stem",
            },
            booting_heading: {
                id: "stg-05",
                title: "Booting/Heading",
                description: "Panicle develops and starts emerging",
            },
            flowering: {
                id: "stg-06",
                title: "Flowering",
                description: "Flowers bloom and pollination occurs",
            },
            grain_filling_ripening: {
                id: "stg-07",
                title: "Grain Filling/Ripening",
                description: "Grains fill and mature",
            },
            harvest: {
                id: "stg-08",
                title: "Harvest",
                description: "Crop is ready for harvesting",
            },
        },
        notifications: {
            stages: {
                germination: {
                    id: "ntf-01",
                    title: "Cultivation Started",
                    message: "Your paddy cultiation has started. Keep the soil moist, maintain proper water levels, and monitor seed germination.",
                },
                seedling_early_vegetative: {
                    id: "ntf-02",
                    title: "Seedling Stage Started",
                    message: "Your crop has entered the Seedling stage. Begin weed control, maintain irrigation, and prepare for the first fertilizer application.",
                },
                tillering: {
                    id: "ntf-03",
                    title: "Tillering Stage Started",
                    message: "Maintain the recommended water level, apply nitrogen fertilizer if needed, inspect for weeds, and monitor crop growth.",
                },
                panicle_initiation: {
                    id: "ntf-04",
                    title: "Panicle Initiation Stage",
                    message: "Apply the recommended fertilizer, maintain irrigation, and monitor the field for pests and diseases.",
                },
                booting_heading: {
                    id: "ntf-05",
                    title: "Booting Stage Started",
                    message: "Ensure a consistent water supply, inspect for insect attacks, and avoid water stress during this important stage."
                },
                flowering: {
                    id: "ntf-06",
                    title: "Flowering Stage Started",
                    message: "Avoid water shortages, monitor for diseases such as leaf blast, and protect the crop during flowering.",
                },
                grain_filling_ripening: {
                    id: "ntf-07",
                    title: "Grain Filling Stage",
                    message: "Continue proper irrigation, reduce unnecessary fertilizer application, and prepare harvesting equipment",
                },
                harvest: {
                    id: "ntf-08",
                    title: "Harvest Time",
                    message: "Your crop is ready for harvest. Check grain maturity, drain excess water if necessary, and being harvesting at the appropriate time."
                }
            }
        },
        recommendations: {
            stages: {
                germination: {
                    watering_recommendation: "Keep the soil moist with a shallow water level (1-2 cm). Avoid flooding during seed germination.",
                    fertilizer_recommendation: "Fertilizer is generally not required during germination. Prepare for the first fertilizer application in the next stage.",
                    disease_and_pest_check: "Check for poor germination, bird damage, and seedling pests.",
                    maintenance_tips: "Monitor seed emergence and ensure uniform crop establishment. Remove debris if necessary.",
                    next_stage_prediction: "Your crop will enter the seedling/early vegetative stage around day 15.",
                },
                seedling_early_vegetative: {
                    watering_recommendation: "Maintain a water level of 3-5 cm. Ensure proper drainage to avoid water stagnation.",
                    fertilizer_recommendation: "Apply the first nitrogen fertilizer (for example, Urea) according to aggricultural recommendations.",
                    disease_and_pest_check: "Inspect the crop for leaf blast, insects, and early pest damage.",
                    maintenance_tips: "Remove weeds, monitor leaf colour, and check overall plant growth.",
                    next_stage_prediction: "Your crop will enter the tillering stage around day 31.",
                },
                tillering: {
                    watering_recommendation: "Maintain a water level of 5 cm to encourage healthy tiller development.",
                    fertilizer_recommendation: "Apply the recommended nitrogen fertilizer if required. Follow local agricultural guidelines.",
                    disease_and_pest_check: "Inspect for stem borers, leaf folders, and other common pests.",
                    maintenance_tips: "Remove weeds, monitor tiller growth, and maintain field drainage.",
                    next_stage_prediction: "Your crop will enter the panicle initiation stage around day 51.",
                },
                panicle_initiation: {
                    watering_recommendation: "Keep a consistent water level of 5 cm and avoid water shortages.",
                    fertilizer_recommendation: "Apply the recommended phosphorous and potassium fertilizers if advised.",
                    disease_and_pest_check: "Check for pest attacks and early disease symptoms.",
                    maintenance_tips: "Observe panicle development and maintain field hygiene.",
                    next_stage_prediction: "Your crop will enter the booting/heading stage around day 66.",
                },
                booting_heading: {
                    watering_recommendation: "Ensure continuous irrigation. Do not allow the field to dry during this stage.",
                    fertilizer_recommendation: "Apply additional fertilizer only if recommended by agricultural guidelines.",
                    disease_and_pest_check: "Monitor for insects, fungal diseases, and leaf damange.",
                    maintenance_tips: "Keep the field clean and inspect crop growth regularly.",
                    next_stage_prediction: "Your crop will enter flowering stage around day 81.",
                },
                flowering: {
                    watering_recommendation: "Avoid water stress by maintaining adaquate moisture throughout flowering.",
                    fertilizer_recommendation: "Avoid unnecessary fertilizer application during flowering.",
                    disease_and_pest_check: "Check for leaf blast, brown spot, and insect damage.",
                    maintenance_tips: "Observe flowering progress and remove infected plants if necessary.",
                    next_stage_prediction: "Your crop will enter the grain filling/ripening stage around day 96.",
                },
                grain_filling_ripening: {
                    watering_recommendation: "Gradually reduce irrigation while ensuring the crop does not dry too early.",
                    fertilizer_recommendation: "No mahor fertilizer application is normally required during this stage.",
                    disease_and_pest_check: "Continue monitoring for gain disease and pest attacks.",
                    maintenance_tips: "Prepare havesting equipment and inspect grain maturity.",
                    next_stage_prediction: "Your crop will reach the harvest stage around day 111.",
                },
                harvest: {
                    watering_recommendation: "Drain excess water before harvesting to imrpove field conditions.",
                    fertilizer_recommendation: "Fertilizer application is no longer required.",
                    disease_and_pest_check: "Inspect the crop before harvesting for final disease or pest issues.",
                    maintenance_tips: "Harvest mature grains and begin post-harvest processing and storage.",
                    next_stage_prediction: "Cultivation cycle completed. you can start a new cultivation session.",
                },
            }
        }
    },
    si: {
        stages: {
            germination: {
                id: "stg-01",
                title: "පැළවීම (Germination)",
                description: "බීජ පැළවීම සහ මුල් කාලීන පැළ වර්ධනය",
            },
            seedling_early_vegetative: {
                id: "stg-02",
                title: "පැළෑටි/මුල් කාලීන වර්ධක අවධිය",
                description: "මුල් සහ පත්‍ර වර්ධනය ආරම්භ වීම",
            },
            tillering: {
                id: "stg-03",
                title: "පඳුරු දැමීම",
                description: "බහුවිධ පඳුරු (අංකුර) වර්ධනය වීම",
            },
            panicle_initiation: {
                id: "stg-04",
                title: "කරල් ආරම්භ වීම",
                description: "කඳ තුළ මල් ව්‍යුහයන් සෑදීම ආරම්භ වීම",
            },
            booting_heading: {
                id: "stg-05",
                title: "ගැබ් ගැනීම/කරල් පීදීම",
                description: "කරල වර්ධනය වී මතුවීමට පටන් ගැනීම",
            },
            flowering: {
                id: "stg-06",
                title: "මල් පිපීම",
                description: "මල් පිපීම සහ පරාගණය සිදු වීම",
            },
            grain_filling_ripening: {
                id: "stg-07",
                title: "කිරි වැදීම/පැසීම",
                description: "ගෙඩි පිරිසී මේරීම",
            },
            harvest: {
                id: "stg-08",
                title: "අස්වනු නෙලීම",
                description: "බෝගය අස්වනු නෙලීමට සූදානම්",
            },
        },
        notifications: {
            stages: {
                germination: {
                    id: "ntf-01",
                    title: "වගාව ආරම්භ කරන ලදී",
                    message: "ඔබේ වී වගාව ආරම්භ කර ඇත. පස තෙතමනය සහිතව තබා ගන්න, නිසි ජල මට්ටම් පවත්වා ගන්න, සහ බීජ පැළවීම නිරීක්ෂණය කරන්න.",
                },
                seedling_early_vegetative: {
                    id: "ntf-02",
                    title: "පැළෑටි අවධිය ආරම්භ විය",
                    message: "ඔබේ බෝගය පැළෑටි අවධියට පැමිණ ඇත. වල් පැලෑටි පාලනය ආරම්භ කරන්න, ජල සම්පාදනය පවත්වා ගන්න, සහ පළමු පොහොර යෙදීම සඳහා සූදානම් වන්න.",
                },
                tillering: {
                    id: "ntf-03",
                    title: "පඳුරු දැමීමේ අවධිය ආරම්භ විය",
                    message: "නිර්දේශිත ජල මට්ටම පවත්වා ගන්න, අවශ්‍ය නම් නයිට්‍රජන් පොහොර යොදන්න, වල් පැලෑටි පරීක්ෂා කරන්න, සහ බෝග වර්ධනය නිරීක්ෂණය කරන්න.",
                },
                panicle_initiation: {
                    id: "ntf-04",
                    title: "කරල් ආරම්භ වීමේ අවධිය",
                    message: "නිර්දේශිත පොහොර යොදන්න, ජල සම්පාදනය පවත්වා ගන්න, සහ පළිබෝධ සහ රෝග සඳහා කුඹුර නිරීක්ෂණය කරන්න.",
                },
                booting_heading: {
                    id: "ntf-05",
                    title: "ගැබ් ගැනීමේ අවධිය ආරම්භ විය",
                    message: "නිරන්තර ජල සැපයුමක් සහතික කරන්න, කෘමි හානි පරීක්ෂා කරන්න, සහ මෙම වැදගත් අවධියේදී ජල හිඟය මඟහරවා ගන්න.",
                },
                flowering: {
                    id: "ntf-06",
                    title: "මල් පිපීමේ අවධිය ආරම්භ විය",
                    message: "ජල හිඟය මඟහරවා ගන්න, කොළ පාළුව වැනි රෝග පිළිබඳව අවධානයෙන් සිටින්න, සහ මල් පිපෙන කාලය තුළ බෝගය ආරක්ෂා කරන්න.",
                },
                grain_filling_ripening: {
                    id: "ntf-07",
                    title: "කිරි වැදීමේ අවධිය",
                    message: "නිසි පරිදි ජල සම්පාදනය දිගටම කරගෙන යන්න, අනවශ්‍ය පොහොර යෙදීම අඩු කරන්න, සහ අස්වනු නෙලීමේ උපකරණ සූදානම් කරන්න.",
                },
                harvest: {
                    id: "ntf-08",
                    title: "අස්වනු නෙලීමේ කාලය",
                    message: "ඔබේ බෝගය අස්වනු නෙලීමට සූදානම්ය. කරල් මේරීම පරීක්ෂා කරන්න, අවශ්‍ය නම් අතිරික්ත ජලය බැස යන්න, සහ සුදුසු වේලාවට අස්වනු නෙලීම ආරම්භ කරන්න.",
                }
            }
        },
        recommendations: {
            stages: {
                germination: {
                    watering_recommendation: "අඩු ජල මට්ටමකින් (සෙ.මී. 1-2) පස තෙතමනය සහිතව තබා ගන්න. බීජ පැළවීමේදී වතුර පිරීම (ගංවතුර තත්ත්වයන්) මඟහරවා ගන්න.",
                    fertilizer_recommendation: "බීජ පැළවීමේදී සාමාන්‍යයෙන් පොහොර අවශ්‍ය නොවේ. ඊළඟ අවධියේදී සිදුකරන පළමු පොහොර යෙදීම සඳහා සූදානම් වන්න.",
                    disease_and_pest_check: "දුර්වල බීජ පැළවීම, කුරුල්ලන්ගෙන් වන හානි සහ මුල් කාලීන පැළෑටි පළිබෝධකයන් පිළිබඳව පරීක්ෂා කරන්න.",
                    maintenance_tips: "බීජ පැළවීම නිරීක්ෂණය කර බෝගය ඒකාකාරීව වැඩීම සහතික කරන්න. අවශ්‍ය නම් රොඩු බොරුවල ඉවත් කරන්න.",
                    next_stage_prediction: "ඔබේ බෝගය දින 15ක් පමණ වන විට පැළෑටි/මුල් කාලීන වර්ධක අවධියට පැමිණෙනු ඇත.",
                },
                seedling_early_vegetative: {
                    watering_recommendation: "සෙ.මී. 3-5 ක ජල මට්ටමක් පවත්වා ගන්න. ජලය එකතු වී තිබීම වැළැක්වීම සඳහා නිසි ජලාපවහනයක් සහතික කරන්න.",
                    fertilizer_recommendation: "කෘෂිකාර්මික නිර්දේශයන්ට අනුව පළමු නයිට්‍රජන් පොහොර (උදාහරණයක් ලෙස යූරියා) යොදන්න.",
                    disease_and_pest_check: "කොළ පාළුව රෝගය, කෘමීන් සහ මුල් කාලීන පළිබෝධ හානි සඳහා බෝගය පරීක්ෂා කරන්න.",
                    maintenance_tips: "වල් පැලෑටි ඉවත් කරන්න, කොළ වල වර්ණය නිරීක්ෂණය කරන්න, සහ සමස්ත ශාක වර්ධනය පරීක්ෂා කරන්න.",
                    next_stage_prediction: "ඔබේ බෝගය දින 31ක් පමණ වන විට පඳුරු දැමීමේ අවධියට පැමිණෙනු ඇත.",
                },
                tillering: {
                    watering_recommendation: "නිරෝගී පඳුරු වර්ධනය දිරිමත් කිරීම සඳහා සෙ.මී. 5 ක ජල ගැඹුරක් පවත්වා ගන්න.",
                    fertilizer_recommendation: "අවශ්‍ය නම් නිර්දේශිත නයිට්‍රජන් පොහොර යොදන්න. දේශීය කෘෂිකාර්මික උපදෙස් අනුගමනය කරන්න.",
                    disease_and_pest_check: "පුරුක් පණුවන්, කොළ හකුලන පණුවන් සහ අනෙකුත් පොදු පළිබෝධකයන් පිළිබඳව පරීක්ෂා කරන්න.",
                    maintenance_tips: "වල් පැලෑටි ඉවත් කරන්න, පඳුරු වර්ධනය නිරීක්ෂණය කරන්න, සහ කුඹුරේ ජලාපවහනය පවත්වා ගන්න.",
                    next_stage_prediction: "ඔබේ බෝගය දින 51ක් පමණ වන විට කරල් ආරම්භ වීමේ අවධියට පැමිණෙනු ඇත.",
                },
                panicle_initiation: {
                    watering_recommendation: "සෙ.මී. 5 ක ස්ථාවර ජල මට්ටමක් පවත්වා ගන්න සහ ජල හිඟය මඟහරවා ගන්න.",
                    fertilizer_recommendation: "උපදෙස් දී ඇත්නම් නිර්දේශිත පොස්පරස් සහ පොටෑසියම් පොහොර යොදන්න.",
                    disease_and_pest_check: "පළිබෝධ ප්‍රහාර සහ මුල් කාලීන රෝග ලක්ෂණ තිබේදැයි පරීක්ෂා කරන්න.",
                    maintenance_tips: "කරල් වර්ධනය නිරීක්ෂණය කර කුඹුරේ පිරිසිදුකම පවත්වා ගන්න.",
                    next_stage_prediction: "ඔබේ බෝගය දින 66ක් පමණ වන විට ගැබ් ගැනීමේ/කරල් පීදීමේ අවධියට පැමිණෙනු ඇත.",
                },
                booting_heading: {
                    watering_recommendation: "අඛණ්ඩ ජල සම්පාදනය සහතික කරන්න. මෙම අවධියේදී කුඹුර වියළීමට ඉඩ නොදෙන්න.",
                    fertilizer_recommendation: "කෘෂිකාර්මික උපදෙස් මගින් නිර්දේශ කර ඇත්නම් පමණක් අතිරේක පොහොර යොදන්න.",
                    disease_and_pest_check: "කෘමීන්, දිලීර රෝග සහ පත්‍ර හානි පිළිබඳව අවධානයෙන් සිටින්න.",
                    maintenance_tips: "කුඹුර පිරිසිදුව තබා ගන්න සහ බෝග වර්ධනය නිතිපතා පරීක්ෂා කරන්න.",
                    next_stage_prediction: "ඔබේ බෝගය දින 81ක් පමණ වන විට මල් පිපීමේ අවධියට පැමිණෙනු ඇත.",
                },
                flowering: {
                    watering_recommendation: "මල් පිපෙන කාලය පුරාම ප්‍රමාණවත් තෙතමනයක් පවත්වා ගැනීමෙන් ජල පීඩනය (හිඟය) මඟහරවා ගන්න.",
                    fertilizer_recommendation: "මල් පිපෙන කාලය තුළ අනවශ්‍ය ලෙස පොහොර යෙදීමෙන් වළකින්න.",
                    disease_and_pest_check: "කොළ පාළුව, දුඹුරු ලප රෝගය සහ කෘමි හානි තිබේදැයි පරීක්ෂා කරන්න.",
                    maintenance_tips: "මල් පිපීමේ ප්‍රගතිය නිරීක්ෂණය කර අවශ්‍ය නම් රෝගී ශාක ඉවත් කරන්න.",
                    next_stage_prediction: "ඔබේ බෝගය දින 96ක් පමණ වන විට කිරි වැදීමේ/පැසීමේ අවධියට පැමිණෙනු ඇත.",
                },
                grain_filling_ripening: {
                    watering_recommendation: "බෝගය නියමිත වේලාවට පෙර වියළී නොයන බව සහතික කරමින් ජල සම්පාදනය ක්‍රමයෙන් අඩු කරන්න.",
                    fertilizer_recommendation: "මෙම අවධියේදී සාමාන්‍යයෙන් ප්‍රධාන වශයෙන් පොහොර යෙදීමක් අවශ්‍ය නොවේ.",
                    disease_and_pest_check: "කරල් වල ඇතිවන රෝග සහ පළිබෝධ ප්‍රහාර පිළිබඳව දිගටම නිරීක්ෂණය කරන්න.",
                    maintenance_tips: "අස්වනු නෙලීමේ උපකරණ සූදානම් කර කරල් මේරීම පරීක්ෂා කරන්න.",
                    next_stage_prediction: "ඔබේ බෝගය දින 111ක් පමණ වන විට අස්වනු නෙලීමේ අවධියට පැමිණෙනු ඇත.",
                },
                harvest: {
                    watering_recommendation: "කුඹුරේ තත්ත්වය යහපත් කර ගැනීම සඳහා අස්වනු නෙලීමට පෙර අතිරික්ත ජලය බැස යන්න.",
                    fertilizer_recommendation: "මින් ඉදිරියට පොහොර යෙදීම අවශ්‍ය නොවේ.",
                    disease_and_pest_check: "අස්වනු නෙලීමට පෙර අවසන් වරට රෝග හෝ පළිබෝධ ගැටළු තිබේදැයි බෝගය පරීක්ෂා කරන්න.",
                    maintenance_tips: "මෝරන ලද කරල් නෙලාගෙන, අස්වනු නෙලීමෙන් පසු සැකසීම සහ ගබඩා කිරීමේ කටයුතු ආරම්භ කරන්න.",
                    next_stage_prediction: "වගා චක්‍රය සම්පූර්ණයි. ඔබට නව වගා වාරයක් ආරම්භ කළ හැක.",
                },
            }
        }
    }
};