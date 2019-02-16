<template>
    <div class="home">
        <PerkOverview :perks="perks.survivors" type="Survivor" />
        <PerkOverview :perks="perks.killers" type="Killer" />
    </div>
</template>

<script>
import PerkOverview from '../components/PerkOverview.vue'

export default {
  name: 'home',
  components: {
    PerkOverview
  },
  data () {
    return {
      perks: {
        'survivors': [
          { 'name': 'ACE IN THE HOLE', 'index': '0', 'cls': 'slotSurv-0', 'checked': false }, {
            'name': 'ADRENALINE',
            'index': '1',
            'cls': 'slotSurv-1',
            'checked': false
          }, { 'name': 'AFTERCARE', 'index': '2', 'cls': 'slotSurv-2', 'checked': false }, {
            'name': 'ALERT',
            'index': '3',
            'cls': 'slotSurv-3',
            'checked': false
          }, { 'name': 'AUTODIDACT', 'index': '4', 'cls': 'slotSurv-4', 'checked': false }, {
            'name': 'BALANCED LANDING',
            'index': '5',
            'cls': 'slotSurv-5',
            'checked': false
          }, { 'name': 'BOIL OVER', 'index': '6', 'cls': 'slotSurv-6', 'checked': false }, {
            'name': 'BOND',
            'index': '7',
            'cls': 'slotSurv-7',
            'checked': false
          }, { 'name': 'BORROWED TIME', 'index': '8', 'cls': 'slotSurv-8', 'checked': false }, {
            'name': 'BOTANY KNOWLEDGE',
            'index': '9',
            'cls': 'slotSurv-9',
            'checked': false
          }, { 'name': 'BREAKDOWN', 'index': '10', 'cls': 'slotSurv-10', 'checked': false }, {
            'name': 'CALM SPIRIT',
            'index': '11',
            'cls': 'slotSurv-11',
            'checked': false
          }, { 'name': 'DANCE WITH ME', 'index': '12', 'cls': 'slotSurv-12', 'checked': false }, {
            'name': 'DARK SENSE',
            'index': '13',
            'cls': 'slotSurv-13',
            'checked': false
          }, { 'name': 'DEAD HARD', 'index': '14', 'cls': 'slotSurv-14', 'checked': false }, {
            'name': 'DECISIVE STRIKE',
            'index': '15',
            'cls': 'slotSurv-15',
            'checked': false
          }, { 'name': 'DEJA VU', 'index': '16', 'cls': 'slotSurv-16', 'checked': false }, {
            'name': 'DELIVERANCE',
            'index': '17',
            'cls': 'slotSurv-17',
            'checked': false
          }, { 'name': 'DETECTIVES HUNCH', 'index': '18', 'cls': 'slotSurv-18', 'checked': false }, {
            'name': 'DISTORTION',
            'index': '19',
            'cls': 'slotSurv-19',
            'checked': false
          }, { 'name': 'DIVERSION', 'index': '20', 'cls': 'slotSurv-20', 'checked': false }, {
            'name': 'EMPATHY',
            'index': '21',
            'cls': 'slotSurv-21',
            'checked': false
          }, { 'name': 'HOPE', 'index': '22', 'cls': 'slotSurv-22', 'checked': false }, {
            'name': 'IRON WILL',
            'index': '23',
            'cls': 'slotSurv-23',
            'checked': false
          }, { 'name': 'KINDRED', 'index': '24', 'cls': 'slotSurv-24', 'checked': false }, {
            'name': 'LEADER',
            'index': '25',
            'cls': 'slotSurv-25',
            'checked': false
          }, { 'name': 'LEFT BEHIND', 'index': '26', 'cls': 'slotSurv-26', 'checked': false }, {
            'name': 'LIGHTWEIGHT',
            'index': '27',
            'cls': 'slotSurv-27',
            'checked': false
          }, { 'name': 'LITHE', 'index': '28', 'cls': 'slotSurv-28', 'checked': false }, {
            'name': 'NO MITHER',
            'index': '29',
            'cls': 'slotSurv-29',
            'checked': false
          }, { 'name': 'NO ONE LEFT BEHIND', 'index': '30', 'cls': 'slotSurv-30', 'checked': false }, {
            'name': 'OBJECT OF OBSESSION',
            'index': '31',
            'cls': 'slotSurv-31',
            'checked': false
          }, { 'name': 'OPEN-HANDED', 'index': '32', 'cls': 'slotSurv-32', 'checked': false }, {
            'name': 'PHARMACY',
            'index': '33',
            'cls': 'slotSurv-33',
            'checked': false
          }, { 'name': 'PLUNDERERS INSTINCT', 'index': '34', 'cls': 'slotSurv-34', 'checked': false }, {
            'name': 'PREMONITION',
            'index': '35',
            'cls': 'slotSurv-35',
            'checked': false
          }, { 'name': 'PROVE THYSELF', 'index': '36', 'cls': 'slotSurv-36', 'checked': false }, {
            'name': 'QUICK AND QUIET',
            'index': '37',
            'cls': 'slotSurv-37',
            'checked': false
          }, { 'name': 'RESILIENCE', 'index': '38', 'cls': 'slotSurv-38', 'checked': false }, {
            'name': 'SABOTEUR',
            'index': '39',
            'cls': 'slotSurv-39',
            'checked': false
          }, { 'name': 'SELF CARE', 'index': '40', 'cls': 'slotSurv-40', 'checked': false }, {
            'name': 'SLIPPERY MEAT',
            'index': '41',
            'cls': 'slotSurv-41',
            'checked': false
          }, { 'name': 'SMALL GAME', 'index': '42', 'cls': 'slotSurv-42', 'checked': false }, {
            'name': 'SOLE SURVIVOR',
            'index': '43',
            'cls': 'slotSurv-43',
            'checked': false
          }, { 'name': 'SPINE CHILL', 'index': '44', 'cls': 'slotSurv-44', 'checked': false }, {
            'name': 'SPRINT BURST',
            'index': '45',
            'cls': 'slotSurv-45',
            'checked': false
          }, { 'name': 'STAKE OUT', 'index': '46', 'cls': 'slotSurv-46', 'checked': false }, {
            'name': 'STREETWISE',
            'index': '47',
            'cls': 'slotSurv-47',
            'checked': false
          }, { 'name': 'TECHNICIAN', 'index': '48', 'cls': 'slotSurv-48', 'checked': false }, {
            'name': 'TENACITY',
            'index': '49',
            'cls': 'slotSurv-49',
            'checked': false
          }, { 'name': 'THIS IS NOT HAPPENING', 'index': '50', 'cls': 'slotSurv-50', 'checked': false }, {
            'name': 'UNBREAKABLE',
            'index': '51',
            'cls': 'slotSurv-51',
            'checked': false
          }, { 'name': 'UP THE ANTE', 'index': '52', 'cls': 'slotSurv-52', 'checked': false }, {
            'name': 'URBAN EVASION',
            'index': '53',
            'cls': 'slotSurv-53',
            'checked': false
          }, { 'name': 'VIGIL', 'index': '54', 'cls': 'slotSurv-54', 'checked': false }, {
            'name': 'WAKE UP',
            'index': '55',
            'cls': 'slotSurv-55',
            'checked': false
          }, { 'name': 'WELL MAKE IT', 'index': '56', 'cls': 'slotSurv-56', 'checked': false }, {
            'name': 'WERE GONNA LIVE FOREVER',
            'index': '57',
            'cls': 'slotSurv-57',
            'checked': false
          }, { 'name': 'WINDOWS OF OPPORTUNITY', 'index': '58', 'cls': 'slotSurv-58', 'checked': false }
        ],
        'killers': [{
          'name': 'AGITATION',
          'index': '0',
          'cls': 'slotKill-0',
          'checked': false
        }, {
          'name': 'A NURSES CALLING',
          'index': '1',
          'cls': 'slotKill-1',
          'checked': false
        }, {
          'name': 'BAMBOOZLE',
          'index': '2',
          'cls': 'slotKill-2',
          'checked': false
        }, {
          'name': 'BARBECUE AND CHILLI',
          'index': '3',
          'cls': 'slotKill-3',
          'checked': false
        }, {
          'name': 'BEAST OF PREY',
          'index': '4',
          'cls': 'slotKill-4',
          'checked': false
        }, {
          'name': 'BITTER MURMUR',
          'index': '5',
          'cls': 'slotKill-5',
          'checked': false
        }, {
          'name': 'BLOODHOUND',
          'index': '6',
          'cls': 'slotKill-6',
          'checked': false
        }, {
          'name': 'BLOOD WARDEN',
          'index': '7',
          'cls': 'slotKill-7',
          'checked': false
        }, {
          'name': 'BRUTAL STRENGTH',
          'index': '8',
          'cls': 'slotKill-8',
          'checked': false
        }, {
          'name': 'COULROPHOBIA',
          'index': '9',
          'cls': 'slotKill-9',
          'checked': false
        }, {
          'name': 'DEERSTALKER',
          'index': '10',
          'cls': 'slotKill-10',
          'checked': false
        }, {
          'name': 'DISCORDANCE',
          'index': '11',
          'cls': 'slotKill-11',
          'checked': false
        }, {
          'name': 'DISTRESSING',
          'index': '12',
          'cls': 'slotKill-12',
          'checked': false
        }, {
          'name': 'DYING LIGHT',
          'index': '13',
          'cls': 'slotKill-13',
          'checked': false
        }, { 'name': 'ENDURING', 'index': '14', 'cls': 'slotKill-14', 'checked': false }, {
          'name': 'FIRE UP',
          'index': '15',
          'cls': 'slotKill-15',
          'checked': false
        }, {
          'name': 'FRANKLINS DEMISE',
          'index': '16',
          'cls': 'slotKill-16',
          'checked': false
        }, {
          'name': 'HANGMANS TRICK',
          'index': '17',
          'cls': 'slotKill-17',
          'checked': false
        }, {
          'name': 'HEX DEVOUR HOPE',
          'index': '18',
          'cls': 'slotKill-18',
          'checked': false
        }, {
          'name': 'HEX HAUNTED GROUND',
          'index': '19',
          'cls': 'slotKill-19',
          'checked': false
        }, {
          'name': 'HEX HUNTRESS LULLABY',
          'index': '20',
          'cls': 'slotKill-20',
          'checked': false
        }, {
          'name': 'HEX NO ONE ESCAPES DEATH',
          'index': '21',
          'cls': 'slotKill-21',
          'checked': false
        }, {
          'name': 'HEX RUIN',
          'index': '22',
          'cls': 'slotKill-22',
          'checked': false
        }, {
          'name': 'HEX THE THIRD SEAL',
          'index': '23',
          'cls': 'slotKill-23',
          'checked': false
        }, {
          'name': 'HEX THRILL OF THE HUNT',
          'index': '24',
          'cls': 'slotKill-24',
          'checked': false
        }, {
          'name': 'INSIDIOUS',
          'index': '25',
          'cls': 'slotKill-25',
          'checked': false
        }, {
          'name': 'IRON GRASP',
          'index': '26',
          'cls': 'slotKill-26',
          'checked': false
        }, {
          'name': 'IRON MAIDEN',
          'index': '27',
          'cls': 'slotKill-27',
          'checked': false
        }, {
          'name': 'KNOCK OUT',
          'index': '28',
          'cls': 'slotKill-28',
          'checked': false
        }, {
          'name': 'LIGHTBORN',
          'index': '29',
          'cls': 'slotKill-29',
          'checked': false
        }, {
          'name': 'MAD GRIT',
          'index': '30',
          'cls': 'slotKill-30',
          'checked': false
        }, {
          'name': 'MAKE YOUR CHOICE',
          'index': '31',
          'cls': 'slotKill-31',
          'checked': false
        }, {
          'name': 'MONITOR AND ABUSE',
          'index': '32',
          'cls': 'slotKill-32',
          'checked': false
        }, {
          'name': 'MONSTROUS SHRINE',
          'index': '33',
          'cls': 'slotKill-33',
          'checked': false
        }, {
          'name': 'OVERCHARGE',
          'index': '34',
          'cls': 'slotKill-34',
          'checked': false
        }, {
          'name': 'OVERWHELMING PRESENCE',
          'index': '35',
          'cls': 'slotKill-35',
          'checked': false
        }, {
          'name': 'PLAY WITH YOUR FOOD',
          'index': '36',
          'cls': 'slotKill-36',
          'checked': false
        }, {
          'name': 'POP GOES THE WEASEL',
          'index': '37',
          'cls': 'slotKill-37',
          'checked': false
        }, { 'name': 'PREDATOR', 'index': '38', 'cls': 'slotKill-38', 'checked': false }, {
          'name': 'RANCOR',
          'index': '39',
          'cls': 'slotKill-39',
          'checked': false
        }, {
          'name': 'REMEMBER ME',
          'index': '40',
          'cls': 'slotKill-40',
          'checked': false
        }, {
          'name': 'SAVE THE BEST FOR LAST',
          'index': '41',
          'cls': 'slotKill-41',
          'checked': false
        }, {
          'name': 'SHADOWBORN',
          'index': '42',
          'cls': 'slotKill-42',
          'checked': false
        }, {
          'name': 'SLOPPY BUTCHER',
          'index': '43',
          'cls': 'slotKill-43',
          'checked': false
        }, {
          'name': 'SPIES FROM THE SHADOWS',
          'index': '44',
          'cls': 'slotKill-44',
          'checked': false
        }, {
          'name': 'SPIRIT FURY',
          'index': '45',
          'cls': 'slotKill-45',
          'checked': false
        }, {
          'name': 'STRIDOR',
          'index': '46',
          'cls': 'slotKill-46',
          'checked': false
        }, {
          'name': 'SURVEILLANCE',
          'index': '47',
          'cls': 'slotKill-47',
          'checked': false
        }, {
          'name': 'TERRITORIAL IMPERATIVE',
          'index': '48',
          'cls': 'slotKill-48',
          'checked': false
        }, {
          'name': 'THANATOPHOBIA',
          'index': '49',
          'cls': 'slotKill-49',
          'checked': false
        }, {
          'name': 'TINKERER',
          'index': '50',
          'cls': 'slotKill-50',
          'checked': false
        }, {
          'name': 'UNNERVING PRESENCE',
          'index': '51',
          'cls': 'slotKill-51',
          'checked': false
        }, {
          'name': 'UNRELENTING',
          'index': '52',
          'cls': 'slotKill-52',
          'checked': false
        }, { 'name': 'WHISPERS', 'index': '53', 'cls': 'slotKill-53', 'checked': false }]
      }
    }
  }
}
</script>
