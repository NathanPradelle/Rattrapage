<!DOCTYPE html>
<html>
<head>
    <title>Récapitulatif de la Tournée de Récolte</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
        }
        .header {
            text-align: center;
            margin-bottom: 20px;
        }
        .details {
            margin-bottom: 20px;
        }
        .details p {
            margin: 5px 0;
        }
        .description {
            margin-top: 20px;
        }
    </style>
</head>
<body>
<div class="header">
    <h2>Récapitulatif de la Tournée de Récolte #{{ $harvestTour->id }}</h2>
</div>
<div class="details">
    <p><strong>Date:</strong> {{ $harvestTour->date }}</p>
    <p><strong>Entrepôt:</strong> {{ $harvestTour->warehouse->name }}</p>
    <p><strong>Période:</strong> {{ ucfirst($harvestTour->period) }}</p>
</div>
<div class="description">
    <h3>Description de la Tournée</h3>
    <p>{!! nl2br(e($description)) !!}</p>
</div>
</body>
</html>
