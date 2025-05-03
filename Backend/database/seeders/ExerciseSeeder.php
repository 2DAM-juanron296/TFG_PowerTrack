<?php

namespace Database\Seeders;

use App\Models\Exercise;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exercises = [
            // Pecho - ID 1
            [
                'name' => 'Press de banca',
                'description' => 'Ejercicio básico para entrenar el pectoral',
                'muscle_group_id' => 1
            ],
            [
                'name' => 'Aperturas en polea',
                'description' => 'Aisla los músculos del pecho abriendo los brazos.',
                'muscle_group_id' => 1
            ],
            // Espalda - ID 2
            [
                'name' => 'Dominadas',
                'description' => 'Ejercicio compuesto que fortalece dorsales y brazos.',
                'muscle_group_id' => 2
            ],
            [
                'name' => 'Remo con barra',
                'description' => 'Desarrolla el grosor de la espalda media.',
                'muscle_group_id' => 2
            ],
            // Bíceps - ID 3
            [
                'name' => 'Curl con barra',
                'description' => 'Trabaja la cabeza larga y corta del bíceps.',
                'muscle_group_id' => 3
            ],
            [
                'name' => 'Curl concentrado',
                'description' => 'Ejercicio de aislamiento para pico del bíceps.',
                'muscle_group_id' => 3
            ],
            // Tríceps - ID 4
            [
                'name' => 'Extensión de tríceps en polea',
                'description' => 'Ideal para trabajar la cabeza larga del tríceps.',
                'muscle_group_id' => 4
            ],
            [
                'name' => 'Fondos en paralelas',
                'description' => 'Ejercicio compuesto para tríceps y pecho.',
                'muscle_group_id' => 4
            ],
            // Hombros - ID 5
            [
                'name' => 'Press militar',
                'description' => 'Trabaja deltoides y trapecio con barra sobre cabeza.',
                'muscle_group_id' => 5
            ],
            [
                'name' => 'Elevaciones laterales',
                'description' => 'Aislamiento de deltoides laterales.',
                'muscle_group_id' => 5
            ],
            // Cuádriceps - ID 6
            [
                'name' => 'Sentadilla frontal',
                'description' => 'Mayor activación del cuádriceps comparado con sentadilla trasera.',
                'muscle_group_id' => 6
            ],
            [
                'name' => 'Extensiones de pierna',
                'description' => 'Ejercicio de aislamiento para cuádriceps.',
                'muscle_group_id' => 6
            ],
            // Isquiotibiales - ID 7
            [
                'name' => 'Peso muerto rumano',
                'description' => 'Estira y fortalece los isquiotibiales con control.',
                'muscle_group_id' => 7
            ],
            [
                'name' => 'Curl femoral en máquina',
                'description' => 'Ejercicio específico para la parte posterior del muslo.',
                'muscle_group_id' => 7
            ],
            // Glúteos - ID 8
            [
                'name' => 'Hip thrust',
                'description' => 'Máxima activación de glúteos con barra.',
                'muscle_group_id' => 8
            ],
            [
                'name' => 'Zancadas',
                'description' => 'Ejercicio funcional que trabaja glúteos y piernas.',
                'muscle_group_id' => 8
            ],
            // Abdomen - ID 9
            [
                'name' => 'Crunch abdominal',
                'description' => 'Ejercicio básico para fortalecer recto abdominal.',
                'muscle_group_id' => 9
            ],
            [
                'name' => 'Elevaciones de piernas',
                'description' => 'Trabaja abdomen inferior y flexores de cadera.',
                'muscle_group_id' => 9
            ],
            // Gemelos - ID 10
            [
                'name' => 'Elevaciones de talón de pie',
                'description' => 'Fortalece gastrocnemio de los gemelos.',
                'muscle_group_id' => 10
            ],
            [
                'name' => 'Elevaciones sentado',
                'description' => 'Trabaja el sóleo con carga moderada.',
                'muscle_group_id' => 10
            ],
        ];

        foreach ($exercises as $exercise) {
            Exercise::create($exercise);
        }
    }
}
