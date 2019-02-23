<template>
    <div class="home">
        <MenuItem :content=content.text type="Info" title="/ Attribution" />
        <MenuItem :perks="perks.survivors" type="Survivor" :title=content.title />
        <MenuItem :perks="perks.killers" type="Killer" :title=content.title />
    </div>
</template>

<script>
import MenuItem from '../components/MenuItem.vue'

export default {
  name: 'home',
  components: {
    MenuItem
  },
  data () {
    return {
      perks: {
        'survivors': [
          { 'name': 'ACE IN THE HOLE', 'index': '0', 'cls': 'slotSurv-0', 'checked': true }, {
            'name': 'ADRENALINE',
            'index': '1',
            'cls': 'slotSurv-1',
            'checked': true
          }, { 'name': 'AFTERCARE', 'index': '2', 'cls': 'slotSurv-2', 'checked': true }, {
            'name': 'ALERT',
            'index': '3',
            'cls': 'slotSurv-3',
            'checked': true
          }, { 'name': 'AUTODIDACT', 'index': '4', 'cls': 'slotSurv-4', 'checked': true }, {
            'name': 'BALANCED LANDING',
            'index': '5',
            'cls': 'slotSurv-5',
            'checked': true
          }, { 'name': 'BOIL OVER', 'index': '6', 'cls': 'slotSurv-6', 'checked': true }, {
            'name': 'BOND',
            'index': '7',
            'cls': 'slotSurv-7',
            'checked': true
          }, { 'name': 'BORROWED TIME', 'index': '8', 'cls': 'slotSurv-8', 'checked': true }, {
            'name': 'BOTANY KNOWLEDGE',
            'index': '9',
            'cls': 'slotSurv-9',
            'checked': true
          }, { 'name': 'BREAKDOWN', 'index': '10', 'cls': 'slotSurv-10', 'checked': true }, {
            'name': 'CALM SPIRIT',
            'index': '11',
            'cls': 'slotSurv-11',
            'checked': true
          }, { 'name': 'DANCE WITH ME', 'index': '12', 'cls': 'slotSurv-12', 'checked': true }, {
            'name': 'DARK SENSE',
            'index': '13',
            'cls': 'slotSurv-13',
            'checked': true
          }, { 'name': 'DEAD HARD', 'index': '14', 'cls': 'slotSurv-14', 'checked': true }, {
            'name': 'DECISIVE STRIKE',
            'index': '15',
            'cls': 'slotSurv-15',
            'checked': true
          }, { 'name': 'DEJA VU', 'index': '16', 'cls': 'slotSurv-16', 'checked': true }, {
            'name': 'DELIVERANCE',
            'index': '17',
            'cls': 'slotSurv-17',
            'checked': true
          }, { 'name': 'DETECTIVES HUNCH', 'index': '18', 'cls': 'slotSurv-18', 'checked': true }, {
            'name': 'DISTORTION',
            'index': '19',
            'cls': 'slotSurv-19',
            'checked': true
          }, { 'name': 'DIVERSION', 'index': '20', 'cls': 'slotSurv-20', 'checked': true }, {
            'name': 'EMPATHY',
            'index': '21',
            'cls': 'slotSurv-21',
            'checked': true
          }, { 'name': 'HOPE', 'index': '22', 'cls': 'slotSurv-22', 'checked': true }, {
            'name': 'IRON WILL',
            'index': '23',
            'cls': 'slotSurv-23',
            'checked': true
          }, { 'name': 'KINDRED', 'index': '24', 'cls': 'slotSurv-24', 'checked': true }, {
            'name': 'LEADER',
            'index': '25',
            'cls': 'slotSurv-25',
            'checked': true
          }, { 'name': 'LEFT BEHIND', 'index': '26', 'cls': 'slotSurv-26', 'checked': true }, {
            'name': 'LIGHTWEIGHT',
            'index': '27',
            'cls': 'slotSurv-27',
            'checked': true
          }, { 'name': 'LITHE', 'index': '28', 'cls': 'slotSurv-28', 'checked': true }, {
            'name': 'NO MITHER',
            'index': '29',
            'cls': 'slotSurv-29',
            'checked': true
          }, { 'name': 'NO ONE LEFT BEHIND', 'index': '30', 'cls': 'slotSurv-30', 'checked': true }, {
            'name': 'OBJECT OF OBSESSION',
            'index': '31',
            'cls': 'slotSurv-31',
            'checked': true
          }, { 'name': 'OPEN-HANDED', 'index': '32', 'cls': 'slotSurv-32', 'checked': true }, {
            'name': 'PHARMACY',
            'index': '33',
            'cls': 'slotSurv-33',
            'checked': true
          }, { 'name': 'PLUNDERERS INSTINCT', 'index': '34', 'cls': 'slotSurv-34', 'checked': true }, {
            'name': 'PREMONITION',
            'index': '35',
            'cls': 'slotSurv-35',
            'checked': true
          }, { 'name': 'PROVE THYSELF', 'index': '36', 'cls': 'slotSurv-36', 'checked': true }, {
            'name': 'QUICK AND QUIET',
            'index': '37',
            'cls': 'slotSurv-37',
            'checked': true
          }, { 'name': 'RESILIENCE', 'index': '38', 'cls': 'slotSurv-38', 'checked': true }, {
            'name': 'SABOTEUR',
            'index': '39',
            'cls': 'slotSurv-39',
            'checked': true
          }, { 'name': 'SELF CARE', 'index': '40', 'cls': 'slotSurv-40', 'checked': true }, {
            'name': 'SLIPPERY MEAT',
            'index': '41',
            'cls': 'slotSurv-41',
            'checked': true
          }, { 'name': 'SMALL GAME', 'index': '42', 'cls': 'slotSurv-42', 'checked': true }, {
            'name': 'SOLE SURVIVOR',
            'index': '43',
            'cls': 'slotSurv-43',
            'checked': true
          }, { 'name': 'SPINE CHILL', 'index': '44', 'cls': 'slotSurv-44', 'checked': true }, {
            'name': 'SPRINT BURST',
            'index': '45',
            'cls': 'slotSurv-45',
            'checked': true
          }, { 'name': 'STAKE OUT', 'index': '46', 'cls': 'slotSurv-46', 'checked': true }, {
            'name': 'STREETWISE',
            'index': '47',
            'cls': 'slotSurv-47',
            'checked': true
          }, { 'name': 'TECHNICIAN', 'index': '48', 'cls': 'slotSurv-48', 'checked': true }, {
            'name': 'TENACITY',
            'index': '49',
            'cls': 'slotSurv-49',
            'checked': true
          }, { 'name': 'THIS IS NOT HAPPENING', 'index': '50', 'cls': 'slotSurv-50', 'checked': true }, {
            'name': 'UNBREAKABLE',
            'index': '51',
            'cls': 'slotSurv-51',
            'checked': true
          }, { 'name': 'UP THE ANTE', 'index': '52', 'cls': 'slotSurv-52', 'checked': true }, {
            'name': 'URBAN EVASION',
            'index': '53',
            'cls': 'slotSurv-53',
            'checked': true
          }, { 'name': 'VIGIL', 'index': '54', 'cls': 'slotSurv-54', 'checked': true }, {
            'name': 'WAKE UP',
            'index': '55',
            'cls': 'slotSurv-55',
            'checked': true
          }, { 'name': 'WELL MAKE IT', 'index': '56', 'cls': 'slotSurv-56', 'checked': true }, {
            'name': 'WERE GONNA LIVE FOREVER',
            'index': '57',
            'cls': 'slotSurv-57',
            'checked': true
          }, { 'name': 'WINDOWS OF OPPORTUNITY', 'index': '58', 'cls': 'slotSurv-58', 'checked': true }
        ],
        'killers': [
          { 'name': 'AGITATION',
          'index': '0',
          'cls': 'slotKill-0',
          'checked': true
        }, {
          'name': 'A NURSES CALLING',
          'index': '1',
          'cls': 'slotKill-1',
          'checked': true
        }, {
          'name': 'BAMBOOZLE',
          'index': '2',
          'cls': 'slotKill-2',
          'checked': true
        }, {
          'name': 'BARBECUE AND CHILLI',
          'index': '3',
          'cls': 'slotKill-3',
          'checked': true
        }, {
          'name': 'BEAST OF PREY',
          'index': '4',
          'cls': 'slotKill-4',
          'checked': true
        }, {
          'name': 'BITTER MURMUR',
          'index': '5',
          'cls': 'slotKill-5',
          'checked': true
        }, {
          'name': 'BLOODHOUND',
          'index': '6',
          'cls': 'slotKill-6',
          'checked': true
        }, {
          'name': 'BLOOD WARDEN',
          'index': '7',
          'cls': 'slotKill-7',
          'checked': true
        }, {
          'name': 'BRUTAL STRENGTH',
          'index': '8',
          'cls': 'slotKill-8',
          'checked': true
        }, {
          'name': 'COULROPHOBIA',
          'index': '9',
          'cls': 'slotKill-9',
          'checked': true
        }, {
          'name': 'DEERSTALKER',
          'index': '10',
          'cls': 'slotKill-10',
          'checked': true
        }, {
          'name': 'DISCORDANCE',
          'index': '11',
          'cls': 'slotKill-11',
          'checked': true
        }, {
          'name': 'DISTRESSING',
          'index': '12',
          'cls': 'slotKill-12',
          'checked': true
        }, {
          'name': 'DYING LIGHT',
          'index': '13',
          'cls': 'slotKill-13',
          'checked': true
        }, { 'name': 'ENDURING', 'index': '14', 'cls': 'slotKill-14', 'checked': true }, {
          'name': 'FIRE UP',
          'index': '15',
          'cls': 'slotKill-15',
          'checked': true
        }, {
          'name': 'FRANKLINS DEMISE',
          'index': '16',
          'cls': 'slotKill-16',
          'checked': true
        }, {
          'name': 'HANGMANS TRICK',
          'index': '17',
          'cls': 'slotKill-17',
          'checked': true
        }, {
          'name': 'HEX DEVOUR HOPE',
          'index': '18',
          'cls': 'slotKill-18',
          'checked': true
        }, {
          'name': 'HEX HAUNTED GROUND',
          'index': '19',
          'cls': 'slotKill-19',
          'checked': true
        }, {
          'name': 'HEX HUNTRESS LULLABY',
          'index': '20',
          'cls': 'slotKill-20',
          'checked': true
        }, {
          'name': 'HEX NO ONE ESCAPES DEATH',
          'index': '21',
          'cls': 'slotKill-21',
          'checked': true
        }, {
          'name': 'HEX RUIN',
          'index': '22',
          'cls': 'slotKill-22',
          'checked': true
        }, {
          'name': 'HEX THE THIRD SEAL',
          'index': '23',
          'cls': 'slotKill-23',
          'checked': true
        }, {
          'name': 'HEX THRILL OF THE HUNT',
          'index': '24',
          'cls': 'slotKill-24',
          'checked': true
        }, {
          'name': 'INSIDIOUS',
          'index': '25',
          'cls': 'slotKill-25',
          'checked': true
        }, {
          'name': 'IRON GRASP',
          'index': '26',
          'cls': 'slotKill-26',
          'checked': true
        }, {
          'name': 'IRON MAIDEN',
          'index': '27',
          'cls': 'slotKill-27',
          'checked': true
        }, {
          'name': 'KNOCK OUT',
          'index': '28',
          'cls': 'slotKill-28',
          'checked': true
        }, {
          'name': 'LIGHTBORN',
          'index': '29',
          'cls': 'slotKill-29',
          'checked': true
        }, {
          'name': 'MAD GRIT',
          'index': '30',
          'cls': 'slotKill-30',
          'checked': true
        }, {
          'name': 'MAKE YOUR CHOICE',
          'index': '31',
          'cls': 'slotKill-31',
          'checked': true
        }, {
          'name': 'MONITOR AND ABUSE',
          'index': '32',
          'cls': 'slotKill-32',
          'checked': true
        }, {
          'name': 'MONSTROUS SHRINE',
          'index': '33',
          'cls': 'slotKill-33',
          'checked': true
        }, {
          'name': 'OVERCHARGE',
          'index': '34',
          'cls': 'slotKill-34',
          'checked': true
        }, {
          'name': 'OVERWHELMING PRESENCE',
          'index': '35',
          'cls': 'slotKill-35',
          'checked': true
        }, {
          'name': 'PLAY WITH YOUR FOOD',
          'index': '36',
          'cls': 'slotKill-36',
          'checked': true
        }, {
          'name': 'POP GOES THE WEASEL',
          'index': '37',
          'cls': 'slotKill-37',
          'checked': true
        }, { 'name': 'PREDATOR', 'index': '38', 'cls': 'slotKill-38', 'checked': true }, {
          'name': 'RANCOR',
          'index': '39',
          'cls': 'slotKill-39',
          'checked': true
        }, {
          'name': 'REMEMBER ME',
          'index': '40',
          'cls': 'slotKill-40',
          'checked': true
        }, {
          'name': 'SAVE THE BEST FOR LAST',
          'index': '41',
          'cls': 'slotKill-41',
          'checked': true
        }, {
          'name': 'SHADOWBORN',
          'index': '42',
          'cls': 'slotKill-42',
          'checked': true
        }, {
          'name': 'SLOPPY BUTCHER',
          'index': '43',
          'cls': 'slotKill-43',
          'checked': true
        }, {
          'name': 'SPIES FROM THE SHADOWS',
          'index': '44',
          'cls': 'slotKill-44',
          'checked': true
        }, {
          'name': 'SPIRIT FURY',
          'index': '45',
          'cls': 'slotKill-45',
          'checked': true
        }, {
          'name': 'STRIDOR',
          'index': '46',
          'cls': 'slotKill-46',
          'checked': true
        }, {
          'name': 'SURVEILLANCE',
          'index': '47',
          'cls': 'slotKill-47',
          'checked': true
        }, {
          'name': 'TERRITORIAL IMPERATIVE',
          'index': '48',
          'cls': 'slotKill-48',
          'checked': true
        }, {
          'name': 'THANATOPHOBIA',
          'index': '49',
          'cls': 'slotKill-49',
          'checked': true
        }, {
          'name': 'TINKERER',
          'index': '50',
          'cls': 'slotKill-50',
          'checked': true
        }, {
          'name': 'UNNERVING PRESENCE',
          'index': '51',
          'cls': 'slotKill-51',
          'checked': true
        }, {
          'name': 'UNRELENTING',
          'index': '52',
          'cls': 'slotKill-52',
          'checked': true
        }, { 'name': 'WHISPERS', 'index': '53', 'cls': 'slotKill-53', 'checked': true }]
      },
      content: {
        title: 'Perk Configuration'
      }
    }
  }
}
</script>
