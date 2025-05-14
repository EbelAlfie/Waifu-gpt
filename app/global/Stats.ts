export type Stats = {
    code: number,
    name: string,
    icon: string|null
}

export const BaseStat = {
    MAX_HP : {
        code: 2000,
        name: "Max HP",
        icon: "ic_max_hp.png"
    },
    ATK : {
        code: 2001,
        name: "ATK",
        icon: "ic_atk.png"
    },
    DEF : {
        code: 2002,
        name: "DEF",
        icon: "ic_def.png"
    },
    EM : {
        code: 28,
        name: "Elemental Mastery",
        icon: "ic_em.png"
    },
    STAMINA : {
        code: 999999,
        name: "Max Stamina",
        icon: "ic_stamina.png"
    }
}

export const AdvancedStat = {
    CRIT_RATE : {
        code: 20,
        name: "CRIT Rate",
        icon: "ic_crit_rate.png"
    },
    CRIT_DMG : {
        code: 22,
        name: "CRIT DMG",
        icon: null
    },
    HEAL : {
        code: 26,
        name: "Healing Bonus",
        icon: "ic_heal_bonus.png"
    },
    INCOMING_HEAL : {
        code: 27,
        name: "Incoming Healling Bonus",
        icon: null
    },
    ER : {
        code: 23,
        name: "Energy Recharge",
        icon: "ic_er.png"
    }
}