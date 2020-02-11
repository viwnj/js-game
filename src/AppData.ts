import axios from 'axios';
import Layer from './Layer';
import FocusManager from './FocusManager';
import EE from './EventEmitter';

interface IComponent {
  name: string;
  args?: {
    [key: string]: any;
  };
}

interface IEntity {
  name: string;
  components: Array<IComponent>;
}

interface ILayer {
  name: string;
  entities?: Array<IEntity>;
}

interface IGameState {
  layers: Array<ILayer>;
}

const LOGIN: IGameState = {
  layers: [
    {
      name: 'UILayer',
      entities: [
        {
          name: 'UsernameInput',
          components: [
            {
              name: 'TextInput',
              args: {
                backgroundColor: '0x333333',
                placeholder: 'Username',
                color: '0xffffff',
                width: 250,
                height: 50,
                left: 10,
                top: 40,
              },
            },
            {
              name: 'KeyboardInput',
            },
          ],
        },
        {
          name: 'PasswordInput',
          components: [
            {
              name: 'TextInput',
              args: {
                backgroundColor: '0x333333',
                placeholder: 'Password',
                color: '0xffffff',
                width: 250,
                height: 50,
                left: 10,
                top: 70,
              },
            },
            {
              name: 'KeyboardInput',
            },
          ],
        },
        {
          name: 'SubmitButton',
          components: [
            {
              name: 'Button',
              args: {
                backgroundColor: '0x0000ff',
                label: 'Login',
                color: '0xffffff',
                width: 120,
                height: 46,
                left: 10,
                top: 100,
                onClick: async (layerContext: Layer) => {
                  try {
                    const username: string = layerContext
                      .GetEntity('UsernameInput')
                      .GetComponent('TextInput').value;
                    const password = layerContext
                      .GetEntity('PasswordInput')
                      .GetComponent('TextInput').value;
                    await axios.post('http://25.67.66.167:3005/login', {
                      username,
                      password,
                    });
                    EE.emmit('GameStateChanged', 'CHARACTER_SELECTION');
                    FocusManager.blur();
                    // layerContext.ClearEntities();D
                  } catch (e) {
                    console.log(e);
                  }
                },
              },
            },
          ],
        },
      ],
    },
  ],
};

const CHARACTER_SELECTION: any = {
  layers: [
    {
      name: 'MainLayer',
      entities: [
        {
          name: 'CharacterSelection',
          components: [
            {
              name: 'CharacterSelection',
            },
          ],
        },
      ],
    },
  ],
};

const CHARACTER_CREATION: IGameState = {
  layers: [
    {
      name: 'MainLayer',
      entities: [],
    },
  ],
};

interface IGameStates {
  [key: string]: IGameState;
}

const STATES: IGameStates = {
  LOGIN,
  CHARACTER_SELECTION,
  CHARACTER_CREATION,
};
export default STATES;
