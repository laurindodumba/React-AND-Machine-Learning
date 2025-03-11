from rest_framework import serializers



# Criar a classe de serialização

class StockPredictionSerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=20)
    
    