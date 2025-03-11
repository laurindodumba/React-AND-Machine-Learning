from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import StockPredictionSerializer  # Nome corrigido
from rest_framework.response import Response
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import datetime 
import os
from django.conf import settings


class StockPredictionAPIView(APIView):
    def post(self, request):
        serializer = StockPredictionSerializer(data=request.data)  # Nome corrigido
        if serializer.is_valid():
            ticker = serializer.validated_data['ticker']
            
            # Pegar a data mais recente
            now = datetime.datetime.now()
            start = datetime.datetime(now.year - 10, now.month, now.day)
            end = now

            df = yf.download(ticker, start=start, end=end)  # Corrigido erro de digitação
            print(df)
            if df.empty:
                return Response({'error': 'Erro, sem dados para prever'}, status=400)
            
            df = df.reset_index()
            
            # Gerar gráfico
            plt.switch_backend('AGG')
            plt.figure(figsize=(12, 5))
            plt.plot(df['Close'], label='Preços das Ações', color='blue')
            plt.title(f'Preço das Ações - {ticker}')
            plt.xlabel('Dias')
            plt.ylabel('Preço de Fechamento')
            plt.legend()
            
            # Salvar o gráfico na pasta `media/`
            plot_img_path = f'{ticker}_plot.png'
            image_path = os.path.join(settings.MEDIA_ROOT, plot_img_path)
            plt.savefig(image_path)
            plt.close()

            # URL da imagem
            image_url = settings.MEDIA_URL + plot_img_path
            print(image_url)

            return Response({'status': 'sucesso', 'ticker': ticker, 'image_url': image_url})
        return Response(serializer.errors, status=400)
