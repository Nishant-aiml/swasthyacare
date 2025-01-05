import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Progress } from "@/components/ui/Progress";
import { Trophy, Heart, Shield } from 'lucide-react';

interface Character {
  id: string;
  name: string;
  health: number;
  maxHealth: number;
  attack: number;
  defense: number;
  image: string;
}

interface BattleAction {
  type: 'attack' | 'heal' | 'defend';
  value: number;
}

const characters: Character[] = [
  {
    id: 'player',
    name: 'Health Hero',
    health: 100,
    maxHealth: 100,
    attack: 20,
    defense: 10,
    image: '/characters/hero.png'
  },
  {
    id: 'enemy',
    name: 'Disease Dragon',
    health: 120,
    maxHealth: 120,
    attack: 15,
    defense: 8,
    image: '/characters/dragon.png'
  }
];

export function HealthBattle() {
  const [player, setPlayer] = useState<Character>(characters[0]);
  const [enemy, setEnemy] = useState<Character>(characters[1]);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('Battle begins!');

  const performAction = (action: BattleAction) => {
    if (gameOver) return;

    let newPlayerHealth = player.health;
    let newEnemyHealth = enemy.health;
    let newMessage = '';

    if (isPlayerTurn) {
      switch (action.type) {
        case 'attack':
          const damage = Math.max(0, action.value - enemy.defense);
          newEnemyHealth = Math.max(0, enemy.health - damage);
          newMessage = `${player.name} attacks for ${damage} damage!`;
          break;
        case 'heal':
          const healing = action.value;
          newPlayerHealth = Math.min(player.maxHealth, player.health + healing);
          newMessage = `${player.name} heals for ${healing} HP!`;
          break;
        case 'defend':
          // Increase defense temporarily
          setPlayer({ ...player, defense: player.defense + action.value });
          newMessage = `${player.name} takes a defensive stance!`;
          break;
      }
    } else {
      // Enemy's turn
      const damage = Math.max(0, enemy.attack - player.defense);
      newPlayerHealth = Math.max(0, player.health - damage);
      newMessage = `${enemy.name} attacks for ${damage} damage!`;
    }

    setPlayer({ ...player, health: newPlayerHealth });
    setEnemy({ ...enemy, health: newEnemyHealth });
    setMessage(newMessage);

    if (newPlayerHealth <= 0) {
      setGameOver(true);
      setMessage(`${enemy.name} wins! Game Over!`);
    } else if (newEnemyHealth <= 0) {
      setGameOver(true);
      setMessage(`${player.name} wins! Victory!`);
    } else {
      setIsPlayerTurn(!isPlayerTurn);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Health Battle Arena</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            {/* Player */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-bold text-lg">{player.name}</h3>
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={player.image}
                    alt={player.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <Progress value={(player.health / player.maxHealth) * 100} />
              <p className="text-center">HP: {player.health}/{player.maxHealth}</p>
            </div>

            {/* Enemy */}
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-bold text-lg">{enemy.name}</h3>
                <div className="relative w-32 h-32 mx-auto">
                  <img
                    src={enemy.image}
                    alt={enemy.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <Progress value={(enemy.health / enemy.maxHealth) * 100} />
              <p className="text-center">HP: {enemy.health}/{enemy.maxHealth}</p>
            </div>
          </div>

          {/* Battle Log */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-center font-medium">{message}</p>
          </div>

          {/* Action Buttons */}
          {!gameOver && isPlayerTurn && (
            <div className="mt-6 grid grid-cols-3 gap-4">
              <Button
                onClick={() => performAction({ type: 'attack', value: player.attack })}
                className="flex items-center justify-center"
              >
                <Trophy className="mr-2 h-4 w-4" />
                Attack
              </Button>
              <Button
                onClick={() => performAction({ type: 'heal', value: 20 })}
                className="flex items-center justify-center"
              >
                <Heart className="mr-2 h-4 w-4" />
                Heal
              </Button>
              <Button
                onClick={() => performAction({ type: 'defend', value: 5 })}
                className="flex items-center justify-center"
              >
                <Shield className="mr-2 h-4 w-4" />
                Defend
              </Button>
            </div>
          )}

          {/* Game Over */}
          {gameOver && (
            <div className="mt-6 text-center">
              <Button
                onClick={() => {
                  setPlayer(characters[0]);
                  setEnemy(characters[1]);
                  setIsPlayerTurn(true);
                  setGameOver(false);
                  setMessage('Battle begins!');
                }}
              >
                Play Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
